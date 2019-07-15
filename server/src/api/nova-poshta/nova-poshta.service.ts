import { Injectable, HttpService, Logger } from '@nestjs/common';
import { Observable, from, of as observableOf } from 'rxjs';
import { map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { FirebaseService } from '../../firebase/firebase.service';
import { Area } from './dto/area.dto';
import { City } from './dto/city.dto';
import { Settlement } from './dto/settlement.dto';
import { Warehouse } from './dto/warehouse.dto';
import { ApiResponse } from './api-response';
import { Street } from './dto/street.dto';
import * as firebase from 'firebase';

@Injectable()
export class NovaPoshtaService {

  private readonly apiUrl: string = 'https://api.novaposhta.ua/v2.0/json';
  private readonly apiKey: string = '5207dd326f06b72edcb97013216d480c';

  constructor(private readonly httpService: HttpService, private firebaseSvc: FirebaseService) {}

  getAreas(): Observable<Area[]> {
    const docRef = this.getDocRef('areas');
    return this.syncAreas()
    .pipe(
      mergeMap(
        _ => docRef.collection('data').get(),
      ),
      map(r => r.docs.map(d => d.data() as Area)),
    );
  }

  getCities(areaRef: string): Observable<City[]> {
    const docRef = this.getDocRef('cities');
    const collectionRef = docRef.collection('data');
    return this.syncCities()
      .pipe(
        mergeMap(
          _ => areaRef ? collectionRef.where('Area', '==', areaRef).get() : collectionRef.get(),
        ),
        map(r => r.docs.map(d => d.data() as City)),
      );
  }

  getSettlements(areaRef: string, regionRef: string): Observable<Settlement[]> {
    return this.callApi('AddressGeneral', 'getSettlements', {
      AreaRef: areaRef,
      RegionRef: regionRef,
    });
  }

  searchSettlements(cityName: string, limit: number): Observable<Settlement[]> {
    return this.callApi('Address', 'searchSettlements', {
      CityName: cityName,
      Limit: limit,
    });
  }

  searchSettlementStreets(settlementRef: string, streetName: string, limit: number): Observable<Street[]> {
    return this.callApi('Address', 'searchSettlementStreets', {
      StreetName: streetName,
      SettlementRef: settlementRef,
      Limit: limit,
    });
  }

  getWarehouses(cityRef: string): Observable<Warehouse[]> {
    const docRef = this.getDocRef('warehouses');
    const collectionRef = docRef.collection('data');
    return this.syncWarehouses()
      .pipe(
        mergeMap(
          _ => cityRef ? collectionRef.where('CityRef', '==', cityRef).get() : collectionRef.get(),
        ),
        map(r => r.docs.map(d => d.data() as Warehouse)),
      );
  }

  private callApi<T>(modelName, calledMethod, methodProperties): Observable<T> {
    const url = `${this.apiUrl}/${modelName}/${calledMethod}`;
    return this.httpService.post(url, {
      modelName,
      calledMethod,
      methodProperties,
      apiKey: this.apiKey,
    }).pipe(map((r: AxiosResponse<ApiResponse<T>>) => r.data.data));
  }

  private checkNeedSync(syncDate): boolean {
    const currentDateTime = new Date();
    const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
    const needSync = !syncDate || syncDate.toDate().valueOf() < currentDate.valueOf();
    return needSync;
  }

  private getDocRef(documentName: string) {
    return this.firebaseSvc.db.collection('novaPoshta').doc(documentName);
  }

  private retrieveFirebaseData(docRef: any): Observable<{syncDate, data}> {
    return from(
      docRef.get(),
    ).pipe(
      map((r: any) => r.data()),
    );
  }

  private syncAreas(): Observable<void> {
    const docRef = this.getDocRef('areas');
    return this.retrieveFirebaseData(docRef).pipe(
      mergeMap(resp => {
        const needSync = !resp || this.checkNeedSync(resp.syncDate);
        if (needSync) {
          return this.callApi<Area[]>('Address', 'getAreas', {})
            .pipe(
              switchMap(data => this.storeCollection<Area>(data, docRef)),
            );
        } else {
          return observableOf(null);
        }
      }),
    );
  }

  private syncCities(): Observable<void> {
    const docRef = this.getDocRef('cities');
    return this.retrieveFirebaseData(docRef).pipe(
      mergeMap(resp => {
        const needSync = !resp || this.checkNeedSync(resp.syncDate);
        if (needSync) {
          return this.callApi<City[]>('Address', 'getCities', {})
            .pipe(
              switchMap(data => {
                const uniqCities: City[] = [];
                data.forEach(city => {
                  if(!uniqCities.find(x => x.CityID === city.CityID)) {
                    uniqCities.push(city);
                  }
                });
                return this.storeCollection<City>(uniqCities, docRef);
              }),
            );
        } else {
          return observableOf(null);
        }
      }),
    );
  }

  private syncWarehouses(): Observable<void> {
    const docRef = this.getDocRef('warehouses');
    return this.retrieveFirebaseData(docRef).pipe(
      mergeMap(resp => {
        const needSync = !resp || this.checkNeedSync(resp.syncDate);
        if (needSync) {
          return this.callApi<Warehouse[]>('AddressGeneral', 'getWarehouses', {})
            .pipe(
              switchMap(data => this.storeCollection<Warehouse>(data, docRef)),
            );
        } else {
          return observableOf(null);
        }
      }),
    );
  }

  private storeCollection<T>(data: T[], docRef: firebase.firestore.DocumentReference) {
    Logger.log(`start storing ${data.length} items`);
    const collectionRef = docRef.collection('data');
    const batches = [];
    while (data.length) {
      batches.push(data.splice(0, 500));
    }
    const promises = [];
    batches.forEach(batchData => {
      const batch = docRef.firestore.batch();
      batchData.forEach(item => batch.set(collectionRef.doc(item.Ref), item));
      promises.push(batch.commit());
    });

    return from(
      Promise.all(promises),
    ).pipe(
      mergeMap(_ => docRef.set({ syncDate: new Date() })),
      map(_ => null),
    );
  }

}

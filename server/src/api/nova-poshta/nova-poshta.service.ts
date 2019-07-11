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

@Injectable()
export class NovaPoshtaService {

  private readonly apiUrl: string = 'https://api.novaposhta.ua/v2.0/json';
  private readonly apiKey: string = '5207dd326f06b72edcb97013216d480c';

  constructor(private readonly httpService: HttpService, private firebaseSvc: FirebaseService) {}

  getAreas(): Observable<Area[]> {
    // return this.handleRequest('areas', 'Address', 'getAreas', {});
    return this.callApi('Address', 'getAreas', {});
  }

  getCity(ref: string): Observable<City> {
    /*return this.handleRequest('cities', 'Address', 'getCities', {
      Ref: ref,
    });*/
    return this.callApi('Address', 'getCities', {
      Ref: ref,
    });
  }

  getCities(): Observable<City[]> {
    // return this.handleRequest('cities', 'Address', 'getCities', {});
    return this.callApi('Address', 'getCities', {});
  }

  getSettlements(areaRef: string, regionRef: string): Observable<Settlement[]> {
    /*return this.handleRequest('settlements', 'AddressGeneral', 'getSettlements', {
      AreaRef: areaRef,
      RegionRef: regionRef,
    });*/
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

  getWarehouses(settlementRef: string): Observable<Warehouse[]> {
    // return this.handleRequest('warehouses', 'AddressGeneral', 'getWarehouses', {
    //   SettlementRef: settlementRef,
    // });
    return this.callApi('AddressGeneral', 'getWarehouses', {
      SettlementRef: settlementRef,
    });
  }
  getWarehouseTypes(settlementRef: string): Observable<Warehouse[]> {
    // return this.handleRequest('warehouses', 'AddressGeneral', 'getWarehouses', {
    //   SettlementRef: settlementRef,
    // });
    return this.callApi('AddressGeneral', 'getWarehouseTypes', {
      SettlementRef: settlementRef,
    });
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
    const needSync = syncDate && syncDate.toDate().valueOf() < currentDate.valueOf();
    return needSync;
  }

  private getDocRef(documentName: string): any {
    return this.firebaseSvc.db.collection('novaPoshta').doc(documentName);
  }

  private retrieveFirebaseData(docRef: any): Observable<{syncDate, data}> {
    return from(
      docRef.get(),
    ).pipe(
      map((r: any) => r.data()),
    );
  }

  private handleRequest<T>(documentName, modelName, calledMethod, methodProperties): Observable<T> {
    const docRef = this.getDocRef(documentName);
    return this.retrieveFirebaseData(docRef).pipe(
      mergeMap(resp => {
        const needSync = this.checkNeedSync(resp.syncDate);
        if (needSync) {
          return this.callApi(modelName, calledMethod, methodProperties)
            .pipe(
              switchMap((response: AxiosResponse) => {
                const data = response.data as T;
                return from(
                  docRef.set({ syncDate: new Date(), data }),
                ).pipe(map(_ => data as T));
              }),
            );
        } else {
          return observableOf(
            resp.data as T,
          );
        }
      }),
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Area } from './models/area.model';
import { City } from './models/city.model';
import { Settlement } from './models/settlement.model';
import { Warehouse } from './models/warehouse.model';
import { tap, map, catchError } from 'rxjs/operators';
import { throwToolbarMixedModesError } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NovaPoshtaService {

  private readonly apiUrl: string = 'https://api.novaposhta.ua/v2.0/json';
  private readonly apiKey: string = '5207dd326f06b72edcb97013216d480c';
  private readonly useBackEnd = false;
  private readonly useCache = false;

  constructor(private http: HttpClient) {}

  getAreas(): Observable<Area[]> {
    return this.getQuery(
      'areas',
      this.http.get<Area[]>('api/nova-poshta/areas')
    );
  }

  getCities(areaRef?: string): Observable<City[]> {
    const key = areaRef ? `cities.${areaRef}` : 'cities';
    if (this.useBackEnd) {
      return this.getQuery(key, this.http.get<City[]>('api/nova-poshta/cities', {
        params: areaRef ? { areaRef } : null
      }));
    } else {
      return this.getQuery(key, this.callApi<City[]>('Address', 'getCities', {}));
    }
  }

  getSettlements(areaRef: string, regionRef: string): Observable<Settlement[]> {
    return this.http.get<Settlement[]>('api/nova-poshta/settlements', {
      params: {
        areaRef,
        regionRef
      }
    });
  }

  getWarehouses(cityRef: string): Observable<Warehouse[]> {
    const key = cityRef ? `warehouses.${cityRef}` : 'warehouses';
    if (this.useBackEnd) {
      return this.getQuery(key, this.http.get<Warehouse[]>('api/nova-poshta/warehouses', {
        params: cityRef ? { cityRef } : null
      }));
    } else {
      return this.getQuery(key, this.callApi<Warehouse[]>('AddressGeneral', 'getWarehouses', { CityRef: cityRef }));
    }
  }

  private storeData(key: string, data: any) {
    localStorage.setItem('np_' + key, JSON.stringify(data));
  }

  private getData(key: string): any {
    const data = localStorage.getItem('np_' + key);
    return data ? JSON.parse(data) : null;
  }

  private getQuery<T>(key: string, source: Observable<T>): Observable<T> {
    const storedData = this.getData(key);
    return this.useCache && storedData ? observableOf(storedData) : source.pipe(
      tap(data => this.storeData(key, data))
    );
  }

  private callApi<T>(modelName, calledMethod, methodProperties): Observable<T> {
    const url = `${this.apiUrl}/${modelName}/${calledMethod}`;
    return this.http.post(url, {
      modelName,
      calledMethod,
      methodProperties,
      apiKey: this.apiKey,
    }).pipe(
      map((r: any) => r.data),
      catchError(e => {
        console.error('Error while call Nova Poshta API', JSON.stringify(e), 'NOVA POSHTA API', true);
        return throwError(e);
      }),
    );
  }
}

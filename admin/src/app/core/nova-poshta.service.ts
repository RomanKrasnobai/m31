import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';
import { Area } from './models/area.model';
import { City } from './models/city.model';
import { Settlement } from './models/settlement.model';
import { Warehouse } from './models/warehouse.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NovaPoshtaService {

  constructor(private http: HttpClient) {}

  getAreas(): Observable<Area[]> {
    return this.getQuery(
      'areas',
      this.http.get<Area[]>('api/nova-poshta/areas')
    );
  }

  getCities(areaRef?: string): Observable<City[]> {
    const key = areaRef ? `cities.${areaRef}` : 'cities';
    return this.getQuery(key, this.http.get<City[]>('api/nova-poshta/cities', {
      params: areaRef ? { areaRef } : null
    }));
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
    return this.getQuery(key, this.http.get<Warehouse[]>('api/nova-poshta/warehouses', {
      params: cityRef ? { cityRef } : null
    }));
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
    return storedData ? observableOf(storedData) : source.pipe(
      tap(data => this.storeData(key, data))
    );
  }
}

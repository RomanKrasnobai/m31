import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from './models/area.model';
import { City } from './models/city.model';
import { Settlement } from './models/settlement.model';
import { Warehouse } from './warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class NovaPoshtaService {

  constructor(private http: HttpClient) {}

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>('api/nova-poshta/areas');
  }

  getCities(areaRef?: string): Observable<City[]> {
    return this.http.get<City[]>('api/nova-poshta/cities', {
      params: areaRef ? { areaRef } : null
    });
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
    return this.http.get<Warehouse[]>('api/nova-poshta/warehouses', {
      params: cityRef ? { cityRef } : null
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovaPoshtaService {

  constructor(private http: HttpClient) {}

  getAreas(): Observable<any> {
    return this.http.get<any>('api/nova-poshta/areas');
  }

  getCities(): Observable<any> {
    return this.http.get<any>('api/nova-poshta/cities');
  }

  getCity(ref: string): Observable<any> {
    return this.http.get<any>(`api/nova-poshta/city/${ref}`);
  }

  getSettlements(areaRef: string, regionRef: string): Observable<any> {
    return this.http.get<any>(`api/nova-poshta/settlements/${areaRef}/${regionRef}`);
  }

  getWarehouses(settlementRef: string): Observable<any> {
    return this.http.get<any>(`api/nova-poshta/warehouses/${settlementRef}`);
  }
}

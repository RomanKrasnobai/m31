import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>('api/orders');
  }

  getById(): Observable<Order> {
    return this.http.get<Order>('api/orders');
  }

  create(dto: Order): Observable<string> {
    return this.http.post<string>('api/orders', dto);
  }

  update(id: string, dto: Order): Observable<Order> {
    return this.http.patch<Order>(`api/orders/${id}`, dto);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`api/orders/${id}`);
  }
}

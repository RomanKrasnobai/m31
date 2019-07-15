import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from './order.model';
import { OrderItem } from './order-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>('api/orders');
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`api/orders/${id}`);
  }

  create(dto: Order): Observable<Order> {
    return this.http.post<Order>('api/orders', dto);
  }

  update(id: string, dto: Order): Observable<Order> {
    return this.http.patch<Order>(`api/orders/${id}`, dto);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`api/orders/${id}`);
  }

  getItems(filter?: any): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>('api/items', {
      params: filter
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>('api/items');
  }

  getById(id: string): Observable<Item> {
    return this.http.get<Item>(`api/items/${id}`);
  }

  create(dto: Item): Observable<Item> {
    return this.http.post<Item>('api/items', dto);
  }

  update(id: string, dto: Item): Observable<Item> {
    return this.http.patch<Item>(`api/items/${id}`, dto);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`api/items/${id}`);
  }
}

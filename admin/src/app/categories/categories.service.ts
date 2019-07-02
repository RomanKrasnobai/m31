import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>('api/categories');
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`api/categories/${id}`);
  }

  set(id: string, dto: Category): Observable<Category> {
    return this.http.patch<Category>(`api/categories/${id}`, dto);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`api/categories/${id}`);
  }
}

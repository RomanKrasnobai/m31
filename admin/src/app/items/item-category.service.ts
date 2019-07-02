import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCategory } from './item.model';

@Injectable()
export class ItemCategoryService {
  getAll(): Observable<ItemCategory[]> {
    throw new Error('Not implemented');
  }

  getById(id: string): Observable<ItemCategory> {
    throw new Error('Not implemented');
  }

  set(id: string, dto: ItemCategory): Observable<ItemCategory> {
    throw new Error('Not implemented');
  }

  delete(id: string): Observable<any> {
    throw new Error('Not implemented');
  }
}

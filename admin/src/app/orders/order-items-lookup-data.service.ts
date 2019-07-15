import { Injectable } from '@angular/core';
import { LookupDataService } from '../core/lookup-dialog/lookup-data.service';
import { OrderItem } from './order-item.model';
import { Observable } from 'rxjs';
import { OrdersService } from './orders.service';

@Injectable({ providedIn: 'root'})
export class OrderItemLookupDataService extends LookupDataService<OrderItem> {

  constructor(private orderService: OrdersService) {
    super();
  }

  getAll(filter?: any): Observable<OrderItem[]> {
    return this.orderService.getItems(filter);
  }
}

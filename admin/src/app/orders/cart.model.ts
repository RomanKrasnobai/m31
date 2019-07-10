import { OrderItem } from './order-item.model';

export class Cart {
  items: Array<OrderItem>;
  discount?: number;
  discountType?: 'P' | 'A';
  totalPrice: number;
}

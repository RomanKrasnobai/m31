import { Customer } from './customer.model';
import { Cart } from './cart.model';
import { DeliveryInfo } from './delivery-info.model';
import { PaymentMethod } from './payment-method.enum';
import { OrderStatus } from './order-status.enum';

export class Order {
  id: string;
  number: string;
  date: Date;
  status: OrderStatus;
  customer: Customer;
  cart: Cart;
  deliveryInfo: DeliveryInfo;
  paymentMethod: PaymentMethod;
}

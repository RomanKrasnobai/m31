import { Customer } from './customer.model';
import { Cart } from './cart.model';
import { DeliveryInfo } from './delivery-info.model';
import { PaymentMethod } from './payment-method.enum';

export class Order {
  id: string;
  customer: Customer;
  cart: Cart;
  deliveryInfo: DeliveryInfo;
  paymentMethod: PaymentMethod;
}

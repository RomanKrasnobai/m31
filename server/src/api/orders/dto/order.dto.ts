import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Customer } from './customer.dto';
import { Cart } from './cart.dto';
import { DeliveryInfo } from './delivery-info.dto';
import { PaymentMethod } from './payment-method.enum';
import { OrderStatus } from './order-status.dto';

export class OrderDto {
  @ApiModelPropertyOptional()
  readonly id: string;
  @ApiModelPropertyOptional()
  number: string;
  @ApiModelPropertyOptional()
  status: OrderStatus;
  @ApiModelPropertyOptional()
  date: Date;
  @ApiModelProperty()
  readonly customer: Customer;
  @ApiModelProperty()
  readonly cart: Cart;
  @ApiModelProperty()
  readonly deliveryInfo: DeliveryInfo;
  @ApiModelProperty()
  readonly paymentMethod: PaymentMethod;
}

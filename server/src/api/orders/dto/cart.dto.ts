import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { OrderItem } from './order-item.dto';

export class Cart {
  @ApiModelProperty()
  items: OrderItem[];
  @ApiModelPropertyOptional()
  discount: number;
  @ApiModelProperty()
  totalPrice: number;
  @ApiModelPropertyOptional()
  discountType: 'P' | 'A';
}

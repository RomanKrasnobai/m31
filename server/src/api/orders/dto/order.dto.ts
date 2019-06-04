import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class OrderDto {
  @ApiModelPropertyOptional()
  readonly id: string;
  @ApiModelProperty()
  readonly customer: any;
  @ApiModelProperty()
  readonly cart: any;
  @ApiModelProperty()
  readonly paymentInfo: any;
}

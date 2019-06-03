import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class OrderDto {
  @ApiModelProperty()
  readonly customer: any;
  @ApiModelProperty()
  readonly cart: any;
  @ApiModelProperty()
  readonly paymentInfo: any;
}

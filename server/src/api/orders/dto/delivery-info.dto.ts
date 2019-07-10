import { ApiModelProperty } from '@nestjs/swagger';

export enum DeliveryMethod {
  NovaPoshta = 'NOVA_POSHTA',
  Pickup = 'PICK_UP',
}

export class DeliveryInfo {
  @ApiModelProperty()
  method: DeliveryMethod;
  @ApiModelProperty()
  info: any;
  @ApiModelProperty()
  date: Date;
}

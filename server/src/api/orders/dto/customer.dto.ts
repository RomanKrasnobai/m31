import { ApiModelProperty } from '@nestjs/swagger';

export class Customer {
  @ApiModelProperty()
  readonly firstName: string;
  @ApiModelProperty()
  readonly lastName: any;
  @ApiModelProperty()
  readonly phone: string;
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly address: string;
}

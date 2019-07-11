import { ApiModelProperty } from '@nestjs/swagger';

export class Area {
  @ApiModelProperty()
  Ref: string;
  @ApiModelProperty()
  AreasCenter: string;
  @ApiModelProperty()
  Description: string;
}

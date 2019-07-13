import { ApiModelProperty } from '@nestjs/swagger';

export class Area {
  @ApiModelProperty({ description: 'Идентификатор Области' })
  Ref: string;
  @ApiModelProperty({ description: 'Описание на украинском языке' })
  AreasCenter: string;
  @ApiModelProperty({ description: 'Идентификатор города, который является областным центром' })
  Description: string;
}

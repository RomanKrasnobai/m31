import { ApiModelProperty } from '@nestjs/swagger';

export class ItemCategory {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  ua: string;
  @ApiModelProperty()
  en: string;
}

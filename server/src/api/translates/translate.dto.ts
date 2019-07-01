import { ApiModelProperty } from '@nestjs/swagger';

export class TranslateDto {
  @ApiModelProperty({ required: false })
  key?: any;
}

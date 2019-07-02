import { ApiModelProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  ua: string;
  @ApiModelProperty()
  en: string;
}

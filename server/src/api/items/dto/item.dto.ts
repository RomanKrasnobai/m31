import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ItemCategory } from './item-category.dto';

export class ItemDto {
  @ApiModelPropertyOptional()
  readonly id: string;
  @ApiModelProperty()
  readonly name: string | { ua: string, en: string };
  @ApiModelProperty()
  readonly category: ItemCategory;
  @ApiModelProperty()
  readonly price: number;
  @ApiModelPropertyOptional()
  readonly description?: string | { ua: string, en: string };
  @ApiModelPropertyOptional()
  readonly image?: string | string[];
}

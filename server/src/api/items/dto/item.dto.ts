import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export enum ItemCategory {
  All,
}

export class ItemDto {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly category: ItemCategory;
  @ApiModelProperty()
  readonly price: number;
  @ApiModelPropertyOptional()
  readonly description?: string;
  @ApiModelPropertyOptional()
  readonly image?: string;
}

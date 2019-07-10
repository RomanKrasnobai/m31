import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

export class OrderItem {
  @ApiModelPropertyOptional()
  id: string;
  @ApiModelProperty()
  name: string | { ua: string, en: string };
  @ApiModelProperty()
  categoryCode: string;
  @ApiModelProperty()
  category: {
    ua: string;
    en: string;
    id: string;
  };
  @ApiModelProperty()
  price: number;
  @ApiModelProperty()
  qty: number;
  @ApiModelPropertyOptional()
  discount: number;
  @ApiModelPropertyOptional()
  discountType: 'P' | 'A';
}

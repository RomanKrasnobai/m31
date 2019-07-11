import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class City {
  @ApiModelProperty()
  Ref: string;
  @ApiModelProperty()
  CityID: string;
  @ApiModelProperty()
  Area: string;
  @ApiModelProperty()
  SettlementType: string;
  @ApiModelProperty()
  SettlementTypeDescription: string;
  @ApiModelProperty()
  SettlementTypeDescriptionRu: string;
  @ApiModelProperty()
  Description: string;
  @ApiModelProperty()
  DescriptionRu: string;
  @ApiModelProperty()
  Delivery1: string;
  @ApiModelProperty()
  Delivery2: string;
  @ApiModelProperty()
  Delivery3: string;
  @ApiModelProperty()
  Delivery4: string;
  @ApiModelProperty()
  Delivery5: string;
  @ApiModelProperty()
  Delivery6: string;
  @ApiModelProperty()
  Delivery7: string;
  @ApiModelPropertyOptional()
  Conglomerates?: any;
  @ApiModelProperty()
  IsBranch: string;
  @ApiModelPropertyOptional()
  PreventEntryNewStreetsUser?: any;
  @ApiModelProperty()
  SpecialCashCheck: number;
}

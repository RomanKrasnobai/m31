import { ApiModelProperty } from '@nestjs/swagger';

export class Street {
  @ApiModelProperty({ description: 'REF населенного пункта'})
  SettlementRef: string;
  @ApiModelProperty({ description: 'REF улицы'})
  SettlementStreetRef: string;
  @ApiModelProperty({ description: 'Описание улицы'})
  SettlementStreetDescription: string;
  @ApiModelProperty({ description: 'Полное описание улицы'})
  Present: string;
  @ApiModelProperty({ description: 'REF типа улицы'})
  StreetsType: string;
  @ApiModelProperty({ description: 'Описание типа улицы'})
  StreetsTypeDescription: string;
}

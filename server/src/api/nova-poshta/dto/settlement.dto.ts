import { ApiModelProperty } from '@nestjs/swagger';

export class Settlement {
  @ApiModelProperty({ description: 'Идентификатор адреса' })
  Ref: string;
  @ApiModelProperty({ description: 'Тип населенного пункта (Село, ПГТ и т.д.)' })
  SettlementType: string;
  @ApiModelProperty({ description: 'Адрес на Украинском языке' })
  Description: string;
  @ApiModelProperty({ description: 'Адрес на русском языке' })
  DescriptionRu: string;
  @ApiModelProperty({ description: 'Обозначение области' })
  Area: string;
  @ApiModelProperty({ description: 'Тип населённого пункта на Украинском языке' })
  SettlementTypeDescription: string;
  @ApiModelProperty({ description: 'Тип населённого пункта на русском языке' })
  SettlementTypeDescriptionRu: string;
  @ApiModelProperty({ description: 'Код населенного пункта' })
  Region: string;
  @ApiModelProperty({ description: 'Область' })
  RegionsDescription: string;
  @ApiModelProperty({ description: 'Область' })
  RegionsDescriptionRu: string;
  @ApiModelProperty({ description: 'Индекс' })
  Index: string;
  @ApiModelProperty({ description: 'Диапазон индексов КОАТУУ' })
  IndexCOATSU1: string;
  @ApiModelProperty({ description: 'Наличие доставки отправления в днях недели' })
  Delivery1: string;
  @ApiModelProperty({ description: 'Наличие доставки отправления в днях недели' })
  Delivery2: string;
  @ApiModelProperty({ description: 'Наличие доставки отправления в днях недели' })
  Delivery3: string;
  @ApiModelProperty({ description: 'Наличие доставки отправления в днях недели' })
  Delivery4: string;
  @ApiModelProperty({ description: 'Наличие доставки отправления в днях недели' })
  Delivery5: string;
  @ApiModelProperty({ description: 'Наличие доставки отправления в днях недели' })
  Delivery6: string;
  @ApiModelProperty({ description: 'Наличие доставки отправления в днях недели' })
  Delivery7: string;
  @ApiModelProperty({ description: 'Наличие отделений' })
  Warehouse: number[];
}

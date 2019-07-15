import { ApiModelProperty } from '@nestjs/swagger';

export class Warehouse {
  @ApiModelProperty({ description: 'Идентификатор адреса' })
  Ref: string;
  @ApiModelProperty({ description: 'Название отделения на Украинском' })
  SiteKey: number;
  @ApiModelProperty({ description: 'Код отделения' })
  Description: string;
  @ApiModelProperty({ description: 'Название отделения на русском' })
  DescriptionRu: string;
  @ApiModelProperty({ description: 'Тип отделения' })
  TypeOfWarehouse: string;
  @ApiModelProperty({ description: 'Номер отделения' })
  Number: number;
  @ApiModelProperty({ description: 'Идентификатор населенного пункта' })
  CityRef: string;
  @ApiModelProperty({ description: 'Название населенного пункта на Украинском' })
  CityDescription: string;
  @ApiModelProperty({ description: 'Название населенного пункта на русском' })
  CityDescriptionRu: string;
  @ApiModelProperty({ description: 'Долгота' })
  Longitude: number;
  @ApiModelProperty({ description: 'Широта' })
  Latitude: number;
  @ApiModelProperty({ description: '(1/0) Наличие кассы Пост-Финанс' })
  PostFinance: number;
  @ApiModelProperty({ description: '(1/0) Наличие пос-терминала на отделении' })
  POSTerminal: number;
  @ApiModelProperty({ description: '(1/0) Возможность оформления Международного отправления' })
  InternationalShipping: number;
  @ApiModelProperty({ description: 'Максимальный вес отправления' })
  TotalMaxWeightAllowed: number;
  @ApiModelProperty({ description: 'Максимальный вес одного места отправления' })
  PlaceMaxWeightAllowed: number;
  @ApiModelProperty({ description: 'График приема отправлений' })
  Reception: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  @ApiModelProperty({ description: 'График отправки день в день' })
  Delivery: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  @ApiModelProperty({ description: 'График работы' })
  Schedule: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
}

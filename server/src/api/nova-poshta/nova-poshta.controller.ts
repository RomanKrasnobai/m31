import { Area } from './dto/area.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { NovaPoshtaService } from './nova-poshta.service';
import { Settlement } from './dto/settlement.dto';
import { City } from './dto/city.dto';
import { Warehouse } from './dto/warehouse.dto';
import { Street } from './dto/street.dto';

// API Адреса https://devcenter.novaposhta.ua/docs/services/556d7ccaa0fe4f08e8f7ce43/operations/58e5ebeceea27017bc851d67
// https://devcenter.novaposhta.ua/docs/services/556d7ccaa0fe4f08e8f7ce43/operations/{operationId}

// tslint:disable: radix
@Controller('nova-poshta')
  @ApiUseTags('Nova Poshta')
export class NovaPoshtaController {

  constructor(private readonly svc: NovaPoshtaService) { }

  @ApiOperation({
    title: 'Справочник географических областей Украины',
    description: `
    Метод «getAreas», работает в модели «Address», этот метод необходим для скачивания
    справочника географических областей Украины, компании «Новая Почта».
    `,
    operationId: '556d9130a0fe4f08e8f7ce48',
  })
  @Get('areas')
  getAreas(): Observable<Area[]> {
    return this.svc.getAreas();
  }

  @ApiOperation({
    title: 'Справочник городов компании',
    description: `
    Получение справочника городов компании «Новая Почта» на украинском и русском языках.
    Метод «getCities» работает в модели «Address», этот метод загружает справочник населенных пунктов Украины.
    Стоит учитывать, справочник выгружается только с населенными пунктами где есть отделения "Нова Пошта"
    и можно оформить доставку на отделение, а также на доставку по адресу.
    `,
    operationId: '556d885da0fe4f08e8f7ce46',
  })
  @Get('cities')
  getCities(@Query('areaRef') areaRef: string): Observable<City[]> {
    return this.svc.getCities(areaRef);
  }

  @ApiOperation({
    title: 'Справочник населенных пунктов Украины',
    description: `
    Метод «getSettlements» работает в модели «AddressGeneral»,
    этот позволяет загрузить справочников городов Украины (на Украинском или Русском),
    в которые осуществляется доставка груза компанией «Новая Почта».
    Стоит учитывать, что метод «getSettlements» для каждого населенного пункта возвращает область,
    и район. Метод отдает не более 150 записей на страницу. Для просмотра более 150 записей, необходимо использовать параметр "Page": "1"
    `,
    operationId: '56248fffa0fe4f0da0550ea8',
  })
  @Get('settlements/:areaRef/:regionRef')
  getSettlements(@Param('areaRef') areaRef: string, @Param('regionRef') regionRef: string): Observable<Settlement[]> {
    return this.svc.getSettlements(areaRef, regionRef);
  }

  @ApiOperation({
    title: 'Онлайн поиск в справочнике населенных пунктов',
    description: `
    Метод «searchSettlements», работает в модели «Address», этот метод необходим для ОНЛАЙН ПОИСКА населенных пунктов.
    `,
    operationId: '58e5ebeceea27017bc851d67',
  })
  @Get('searchSettlements')
  searchSettlements(@Query('cityName') cityName: string, @Query('limit') limit: string): Observable<Settlement[]> {
    return this.svc.searchSettlements(cityName, Number.parseInt(limit));
  }

  @ApiOperation({
    title: 'Онлайн поиск в справочнике населенных пунктов',
    description: `
    Метод «searchSettlementStreets», работает в модели «Address», этот метод необходим для ОНЛАЙН ПОИСКА улиц в выбранном населенном пункте
    `,
    operationId: '58e5f369eea27017540b58ac',
  })
  @Get('searchSettlements')
  searchSettlementStreets(
    @Query('settlementRef') settlementRef: string, @Query('streetName') streetName: string, @Query('limit') limit: string): Observable<Street[]> {
    return this.svc.searchSettlementStreets(settlementRef, streetName, Number.parseInt(limit));
  }

  @ApiOperation({
    title: 'Справочник отделений и типов отделений',
    description: `
    Метод «getWarehouses», работает в модели «Address», этот метод загружает справочник отделений «Новая Почта» в рамках населенных пунктов Украины.
    `,
    operationId: '556d8211a0fe4f08e8f7ce45',
  })
  @Get('warehouses')
  getWarehouses(@Query('cityRef') cityRef: string): Observable<Warehouse[]> {
    return this.svc.getWarehouses(cityRef);
  }
}

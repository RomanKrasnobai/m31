import { Controller, Get, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { NovaPoshtaService } from './nova-poshta.service';
import { Settlement } from './dto/settlement.dto';
import { City } from './dto/city.dto';
import { Warehouse } from './dto/warehouse.dto';

// API Адреса https://devcenter.novaposhta.ua/docs/services/556d7ccaa0fe4f08e8f7ce43/operations/58e5ebeceea27017bc851d67
// https://devcenter.novaposhta.ua/docs/services/556d7ccaa0fe4f08e8f7ce43/operations/{operationId}

@Controller('nova-poshta')
  @ApiUseTags('Nova Poshta')
export class NovaPoshtaController {

  constructor(private readonly svc: NovaPoshtaService) { }

  @Get('areas')
  getAreas(): Observable<any> {
    return this.svc.getAreas();
  }

  @Get('city/:ref')
  getCity(@Param('ref') ref: string): Observable<City> {
    return this.svc.getCity(ref);
  }

  @Get('cities')
  getCities(): Observable<City[]> {
    return this.svc.getCities();
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
    operationId: '56248fffa0fe4f0da0550ea8'
  })
  @Get('settlements/:areaRef/:regionRef')
  getSettlements(@Param('areaRef') areaRef: string, @Param('regionRef') regionRef: string): Observable<Settlement[]> {
    return this.svc.getSettlements(areaRef, regionRef);
  }

  @Get('warehouses/:settlementRef')
  getWarehouses(@Param('settlementRef') settlementRef: string): Observable<Warehouse[]> {
    return this.svc.getWarehouses(settlementRef);
  }
}

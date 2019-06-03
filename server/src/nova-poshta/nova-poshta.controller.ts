import { Controller, Get, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { NovaPoshtaService } from './nova-poshta.service';

@Controller('nova-poshta')
  @ApiUseTags('Nova Poshta')
export class NovaPoshtaController {

  constructor(private readonly svc: NovaPoshtaService) { }

  @Get('areas')
  getAreas(): Observable<any> {
    return this.svc.getAreas();
  }

  @Get('city/:ref')
  getCity(@Param('ref') ref: string): Observable<any> {
    return this.svc.getCity(ref);
  }

  @Get('cities')
  getCities(): Observable<any> {
    return this.svc.getCities();
  }

  @Get('settlements/:areaRef/:regionRef')
  getSettlements(@Param('areaRef') areaRef: string, @Param('regionRef') regionRef: string): Observable<any> {
    return this.svc.getSettlements(areaRef, regionRef);
  }

  @Get('warehouses/:settlementRef')
  getWarehouses(@Param('settlementRef') settlementRef: string): Observable<any> {
    return this.svc.getWarehouses(settlementRef);
  }
}

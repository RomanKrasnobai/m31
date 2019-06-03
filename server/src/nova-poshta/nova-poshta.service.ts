import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

@Injectable()
export class NovaPoshtaService {

  private readonly apiUrl: string = 'https://api.novaposhta.ua/v2.0/json';
  private readonly apiKey: string = '5207dd326f06b72edcb97013216d480c';

  constructor(private readonly httpService: HttpService) {}

  getAreas(): Observable<any> {
    return this.callApi('Address', 'getAreas', {});
  }

  getCity(ref: string): Observable<any> {
    return this.callApi('Address', 'getCities', {
      Ref: ref,
    });
  }

  getCities(): Observable<any> {
    return this.callApi('Address', 'getCities', {});
  }

  getSettlements(areaRef: string, regionRef: string): Observable<any> {
    return this.callApi('AddressGeneral', 'getSettlements', {
      AreaRef: areaRef,
      RegionRef: regionRef,
    });
  }

  getWarehouses(settlementRef: string): Observable<any> {
    return this.callApi('AddressGeneral', 'getWarehouses', {
      SettlementRef: settlementRef,
    });
  }

  private callApi(modelName, calledMethod, methodProperties): Observable<AxiosResponse<any>> {
    const url = `${this.apiUrl}/${modelName}/${calledMethod}`;
    return this.httpService.post(url, {
      modelName,
      calledMethod,
      methodProperties,
      apiKey: this.apiKey,
    }).pipe(map(r => r.data));
  }

}

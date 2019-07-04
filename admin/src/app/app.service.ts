import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Injectable({ providedIn: 'root' })
export class AppService {
  public loading$ = new BehaviorSubject<boolean>(false);

  public get currencySuffix(): string {
    const currencySign = this.translate.instant('common.currency.uah');
    return ` ${currencySign}`;
  }

  public get currencyMask() {
    const mask = createNumberMask({
      prefix: '₴',
      suffix: '',
      includeThousandsSeparator: true,
      allowDecimal: true,
      decimalLimit: 2,
      requireDecimal: false,
      allowNegative: false,
      allowLeadingZeroes: false,
      integerLimit: 8
    });
    return { mask };
  }

  constructor(private translate: TranslateService) {}

}

import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { CoreModule, HttpLoaderFactory } from '../core/core.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { CoreTranslateService } from '../core/translate.service';
import { LookupDataService } from '../core/lookup-dialog/lookup-data.service';
import { OrderItemLookupDataService } from './order-items-lookup-data.service';

@NgModule({
  declarations: [OrderListComponent, OrderPageComponent],
  imports: [
    CoreModule,
    OrdersRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      // isolate: true
    })
  ],
  providers: [
    { provide: TranslateService, useExisting: CoreTranslateService },
    { provide: LookupDataService, useClass: OrderItemLookupDataService }
  ],
})
export class OrdersModule { }

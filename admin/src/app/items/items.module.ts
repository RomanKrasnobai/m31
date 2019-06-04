import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { CoreModule, HttpLoaderFactory } from '../core/core.module';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { CoreTranslateService } from '../core/translate.service';

@NgModule({
  declarations: [ItemListComponent, ItemPageComponent],
  imports: [
    CoreModule,
    ItemsRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      // isolate: true
    })
  ],
  providers: [
    { provide: TranslateService, useExisting: CoreTranslateService }
  ],
})
export class ItemsModule { }

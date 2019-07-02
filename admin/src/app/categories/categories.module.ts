import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryListComponent } from './category-list/category-list.component';
import { CoreModule, HttpLoaderFactory } from '../core/core.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { CoreTranslateService } from '../core/translate.service';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [
    CoreModule,
    CategoriesRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      // isolate: true
    })
  ],
  providers: [
    { provide: TranslateService, useExisting: CoreTranslateService }
  ],
})
export class CategoriesModule { }

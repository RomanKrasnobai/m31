import { NgModule } from '@angular/core';
import { FooterComponent } from './footer-component/footer-component.component';
import { HeaderComponent } from './header-component/header-component.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {CoreTranslateService} from '../core/translate.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `/../assets/i18n/`);
}

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        LeftMenuComponent,
    ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
    }),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LeftMenuComponent,
    TranslateModule
  ],
    providers: [{ provide: TranslateService, useExisting: CoreTranslateService }]
  })
  export class SharedComponentsModule { }

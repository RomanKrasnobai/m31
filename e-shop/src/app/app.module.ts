import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpLoaderFactory, SharedComponentsModule} from './shared-components/shared-components.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {CoreTranslateService} from './core/translate.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedComponentsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: TranslateService, useClass: CoreTranslateService }],
  bootstrap: [AppComponent]
})
export class AppModule { }

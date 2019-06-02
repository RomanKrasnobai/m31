import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home-component/home-component.component';
import { PaymentDeliveryComponent } from './pages/payment-delivery-component/payment-delivery-component.component';
import { FooterComponent } from './shared-components/footer-component/footer-component.component';
import { HeaderComponent } from './shared-components/header-component/header-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaymentDeliveryComponent,
    FooterComponent, // remove
    HeaderComponent, // remove
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

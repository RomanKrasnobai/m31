import { NgModule } from '@angular/core';
import { PaymentDeliveryComponent } from './payment-delivery-component.component';
import { CommonModule } from '@angular/common';
import { PaymentDeliveryRoutingModule } from './payment-delivery-routing.module';

@NgModule({
    declarations: [
        PaymentDeliveryComponent,
    ],
    imports: [
        CommonModule,
        PaymentDeliveryRoutingModule,
    ],
    providers: []
  })
  export class PaymentDeliveryModule { }

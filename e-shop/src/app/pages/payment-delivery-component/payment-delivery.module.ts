import { NgModule } from '@angular/core';
import { PaymentDeliveryComponent } from './payment-delivery-component.component';
import { CommonModule } from '@angular/common';
import { PaymentDeliveryRoutingModule } from './payment-delivery-routing.module';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';

@NgModule({
    declarations: [
        PaymentDeliveryComponent,
    ],
  imports: [
    CommonModule,
    PaymentDeliveryRoutingModule,
    SharedComponentsModule,
  ],
    providers: []
  })
  export class PaymentDeliveryModule { }

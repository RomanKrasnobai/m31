import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentDeliveryComponent } from './payment-delivery-component.component';

const routes: Routes = [
    {
      path: '',
      component: PaymentDeliveryComponent
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PaymentDeliveryRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './pages/home-component/home.module#HomeModule'
  },
  {
    path: 'contacts',
    loadChildren: './pages/contacts-component/contacts.module#ContactsModule'
  },
  {
    path: 'payment-delivery',
    loadChildren: './pages/payment-delivery-component/payment-delivery.module#PaymentDeliveryModule'
  },
  {
    path: 'summary',
    loadChildren: './pages/summary-component/summary-component.module#SummaryComponentModule'
  },
  {
    path: 'product-info/:id',
    loadChildren: './pages/product-info/product-info.module#ProductInfoModule'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

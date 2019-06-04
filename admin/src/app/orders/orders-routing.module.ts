import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderPageComponent } from './order-page/order-page.component';

const routes: Routes = [
  { path: '', component: OrderListComponent, pathMatch: 'full' },
  { path: 'new', component: OrderPageComponent },
  { path: 'edit/:id', component: OrderPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule { }

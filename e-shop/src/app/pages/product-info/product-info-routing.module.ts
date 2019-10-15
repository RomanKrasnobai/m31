import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProductInfoComponent} from './product-info.component';

const routes: Routes = [
  {
    path: '',
    component: ProductInfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductInfoRoutingModule { }

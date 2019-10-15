import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';
import {ProductInfoComponent} from './product-info.component';
import {ProductInfoRoutingModule} from './product-info-routing.module';

@NgModule({
  declarations: [ProductInfoComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ProductInfoRoutingModule,
  ]
})
export class ProductInfoModule { }

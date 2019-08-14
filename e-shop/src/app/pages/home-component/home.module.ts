import { NgModule } from '@angular/core';
import { HomeComponent } from './home-component.component';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import {
  MatInputModule,
  MatFormFieldModule,
  MatProgressSpinnerModule, MatButtonModule, MatDialogModule
} from '@angular/material';
import { ProductItemComponent } from './product-item/product-item.component';
import {BasketComponentComponent} from "../basket-component/basket-component.component";

@NgModule({
  declarations: [
    HomeComponent,
    ProductItemComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedComponentsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents: [BasketComponentComponent],
  providers: []
})
export class HomeModule { }

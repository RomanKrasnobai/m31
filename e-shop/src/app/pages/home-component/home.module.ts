import { NgModule } from '@angular/core';
import { HomeComponent } from './home-component.component';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import {
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedComponentsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: []
})
export class HomeModule { }

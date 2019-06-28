import { NgModule } from '@angular/core';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts-component.component';
import { CommonModule } from '@angular/common';
import {SharedComponentsModule} from '../../shared-components/shared-components.module';

@NgModule({
    declarations: [
        ContactsComponent,
    ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedComponentsModule,
  ],
    providers: []
  })
  export class ContactsModule { }

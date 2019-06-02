import { NgModule } from '@angular/core';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts-component.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ContactsComponent,
    ],
    imports: [
        CommonModule,
        ContactsRoutingModule,
    ],
    providers: []
  })
  export class ContactsModule { }

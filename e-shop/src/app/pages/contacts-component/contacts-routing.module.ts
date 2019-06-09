import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactsComponent } from './contacts-component.component';

const routes: Routes = [
    {
      path: '',
      component: ContactsComponent
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ContactsRoutingModule { }

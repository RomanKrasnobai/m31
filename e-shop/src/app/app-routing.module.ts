import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component.component';

const routes: Routes = [{
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contacts',
    loadChildren: './pages/contacts-component/contacts.module#ContactsModule'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

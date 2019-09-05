import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CoreModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

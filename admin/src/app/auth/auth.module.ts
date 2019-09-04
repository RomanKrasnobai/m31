import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import * as firebase from 'firebase/app';

import { CoreModule } from '../core/core.module';

const firebaseConfig = {
  apiKey: 'AIzaSyCvn_7ZlW9FH3aVsHhuSAZF7vAoXM2gLOE',
  authDomain: 'm31-studio.firebaseapp.com',
  databaseURL: 'https://m31-studio.firebaseio.com',
  projectId: 'm31-studio',
  storageBucket: 'm31-studio.appspot.com',
  messagingSenderId: '568938147559',
  appId: '1:568938147559:web:034e28a07b07bca4'
};
firebase.initializeApp(firebaseConfig);

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

import { Module } from '@nestjs/common';

import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/firestore';
import { FirebaseService } from './firebase.service';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCvn_7ZlW9FH3aVsHhuSAZF7vAoXM2gLOE',
  authDomain: 'm31-studio.firebaseapp.com',
  databaseURL: 'https://m31-studio.firebaseio.com',
  projectId: 'm31-studio',
  storageBucket: 'm31-studio.appspot.com',
  messagingSenderId: '568938147559',
  appId: '1:568938147559:web:034e28a07b07bca4',
};

const app = firebase.initializeApp(firebaseConfig);

@Module({
  imports: [],
  exports: [FirebaseService],
  controllers: [],
  providers: [
    FirebaseService,
    {
      provide: 'Firestore',
      useValue: app.firestore(),
    },
  ],
})
export class FirebaseModule {}

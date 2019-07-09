import { Module } from '@nestjs/common';

import * as firebase from 'firebase';
import * as functions from 'firebase-functions';
import 'firebase/database';
import 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { serviceAccount } from './firebase.config';

const serviceAccountEnv = functions.config().service_account || {};
const firebaseConfig = Object.assign({}, serviceAccount, {
  api: serviceAccountEnv.api_key,
  messagingSenderId: serviceAccountEnv.messaging_sender_id,
  appId: serviceAccountEnv.app_id,
});

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

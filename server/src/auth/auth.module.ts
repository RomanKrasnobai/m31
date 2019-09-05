import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthService } from './auth.service';
import * as admin from 'firebase-admin';
// tslint:disable-next-line: no-var-requires
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://m31-studio.firebaseio.com'
});

@Module({
  imports: [FirebaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

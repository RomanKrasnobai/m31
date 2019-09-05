import { Module, Logger } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuthService } from './auth.service';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: 'https://m31-studio.firebaseio.com',
});

Logger.log(serviceAccount, 'SERVICE ACCOUNT]');

@Module({
  imports: [FirebaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

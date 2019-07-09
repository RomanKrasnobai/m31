import { Injectable, Logger } from '@nestjs/common';
import * as functions from 'firebase-functions';
import { serviceAccount } from './firebase/firebase.config';

@Injectable()
export class AppService {
  get(): string {
    const config = functions.config();
    const serviceAccountConf = config && config.service_account || {};
    const firebaseConfig = process.env.FIREBASE_CONFIG;
    return `
    <html>
    <body>
      <div style="display: flex; flex-direction: column; padding: 12px; width: 100%; height: 100%">
        <p>GCLOUD_PROJECT: ${process.env.GCLOUD_PROJECT}</p>
        <hr />
        <p><a href="app/e-shop">E-Shop</a></p>
        <p><a href="app/admin">Admin</a></p>
        <p><a href="app/swagger">Swagger</a></p>
      </div>
    </body>
    </html>
    `;
  }
}

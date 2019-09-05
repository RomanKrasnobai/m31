import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {

  login(email: string, password: string): Observable<string> {
    const query = admin.auth().createCustomToken('nAFlAMiiASanV1cH4prOZZXhwZf2');
    return from(query);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  login(email: string, password: string): Observable<string> {
    const query = from(admin.auth().getUserByEmail(email))
    .pipe(
      mergeMap(
        user => admin.auth().createCustomToken(user.uid),
      ),
    );
    return from(query);
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }
}

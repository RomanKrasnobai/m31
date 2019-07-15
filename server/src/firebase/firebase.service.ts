import { Injectable, Inject } from '@nestjs/common';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

  constructor(
    @Inject('Firestore') public db: firebase.firestore.Firestore,
  ) {}
}

import { Injectable, Inject } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';

@Injectable()
export class FirebaseService {

  constructor(
    @Inject('Firestore') public db: Firestore
  ) {}
}

import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class FirebaseService {

  constructor(
    @Inject('Firestore') public db: any
  ) {}
}

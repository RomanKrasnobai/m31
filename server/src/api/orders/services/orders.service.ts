import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';

import { FirebaseService } from '../../../firebase/firebase.service';
import { OrderDto } from '../dto/order.dto';

@Injectable()
export class OrdersService {

  protected readonly collectionName: string = 'orders';

  protected get collection() {
    return this.firebaseSvc.db.collection(this.collectionName);
  }

  constructor(private firebaseSvc: FirebaseService) { }

  findAll(): Observable<OrderDto[]> {
    return from(
      this.collection.get(),
    ).pipe(
      map(r => r.docs.map(x => x.data() as OrderDto),
      ),
    );
  }

  findById(id: string): Observable<OrderDto> {
    return from(
      this.collection.doc(id).get(),
    ).pipe(
      map(r => r.data() as OrderDto),
    );
  }

  create(dto: OrderDto): Observable<string> {
    const id = Guid.create().toString();
    return from(
      this.collection.doc(id).set(dto),
    ).pipe(map(x => id));
  }

  update(id: string, dto: OrderDto): Observable<OrderDto> {
    return from(
      this.collection.doc(id).set(dto),
    ).pipe(map(x => dto));
  }

  delete(id: string): Observable<any> {
    return from(
      this.collection.doc(id).delete(),
    );
  }
}

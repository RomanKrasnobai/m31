import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { FirebaseService } from '../../../firebase/firebase.service';
import { take, map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { ItemDto } from '../dto/item.dto';

@Injectable()
export class ItemsService {

  constructor(private firebaseSvc: FirebaseService) {}

  findAll(): Observable<ItemDto[]> {
    return from(
      this.firebaseSvc.db.collection('items').get(),
    ).pipe(
        map(r => r.docs.map(x => x.data() as ItemDto),
      ),
    );
  }

  findById(id: string): Observable<ItemDto> {
    return from(
      this.firebaseSvc.db.collection('items').doc(id).get(),
    ).pipe(
      map(r => r.data() as ItemDto),
    );
  }

  create(dto: ItemDto): Observable<string> {
    const id = Guid.create().toString();
    return from(
      this.firebaseSvc.db.collection('items').doc(id).set(dto),
    ).pipe(map(x => id));
  }

  update(id: string, dto: ItemDto): Observable<ItemDto> {
    return from(
      this.firebaseSvc.db.collection('items').doc(id).set(dto),
    ).pipe(map(x => dto));
  }

  delete(id: string): Observable<any> {
    return from(
      this.firebaseSvc.db.collection('items').doc(id).delete(),
    );
  }
}

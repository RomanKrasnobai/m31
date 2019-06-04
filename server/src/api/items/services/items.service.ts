import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { FirebaseService } from '../../../firebase/firebase.service';
import { take, map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { ItemDto } from '../dto/item.dto';

@Injectable()
export class ItemsService {

  protected readonly collectionName: string = 'items';

  protected get collection() {
    return this.firebaseSvc.db.collection(this.collectionName);
  }

  constructor(private firebaseSvc: FirebaseService) {}

  findAll(): Observable<ItemDto[]> {
    return from(
      this.collection.get(),
    ).pipe(
        map(r => r.docs.map(x => ({id: x.id, ...x.data()}) as ItemDto),
      ),
    );
  }

  findById(id: string): Observable<ItemDto> {
    return from(
      this.collection.doc(id).get(),
    ).pipe(
      map(r => ({id, ...r.data()} as ItemDto)),
    );
  }

  create(dto: ItemDto): Observable<ItemDto> {
    const id = Guid.create().toString();
    return from(
      this.collection.doc(id).set(dto),
    ).pipe(map(x => ({id, ...dto})));
  }

  update(id: string, dto: ItemDto): Observable<ItemDto> {
    return from(
      this.collection.doc(id).set(dto),
    ).pipe(map(x => ({id, ...dto})));
  }

  delete(id: string): Observable<any> {
    return from(
      this.collection.doc(id).delete(),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { FirebaseService } from '../../firebase/firebase.service';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { CategoryDto } from './category-dto';

@Injectable()
export class CategoriesService {

  protected readonly collectionName: string = 'categories';

  protected get collection() {
    return this.firebaseSvc.db.collection(this.collectionName);
  }

  constructor(private firebaseSvc: FirebaseService) { }

  findAll(): Observable<CategoryDto[]> {
    return from(
      this.collection.get(),
    ).pipe(
      map((r: any) => r.docs.map(x => ({ id: x.id, ...x.data() }) as CategoryDto),
      ),
    );
  }

  findById(id: string): Observable<CategoryDto> {
    return from(
      this.collection.doc(id).get(),
    ).pipe(
      map((r: any) => ({ id, ...r.data() } as CategoryDto)),
    );
  }

  create(dto: CategoryDto): Observable<CategoryDto> {
    const id = Guid.create().toString();
    return from(
      this.collection.doc(id).set(dto),
    ).pipe(map(x => ({ id, ...dto })));
  }

  update(id: string, dto: CategoryDto): Observable<CategoryDto> {
    return from(
      this.collection.doc(id).set(dto),
    ).pipe(map(x => ({ id, ...dto })));
  }

  delete(id: string): Observable<any> {
    return from(
      this.collection.doc(id).delete(),
    );
  }
}

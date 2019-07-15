import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { FirebaseService } from '../../firebase/firebase.service';
import { map } from 'rxjs/operators';
import { TranslateDto } from './translate.dto';

@Injectable()
export class TranslateService {

  protected readonly collectionName: string = 'translates';

  protected get collection() {
    return this.firebaseSvc.db.collection(this.collectionName);
  }

  constructor(private firebaseSvc: FirebaseService) { }

  findAll(): Observable<TranslateDto> {
    return from(
      this.collection.doc().get(),
    ).pipe(
      map((r: any) => r.docs.map(x => ({ locale: x.id, ...x.data() as TranslateDto}))),
    );
  }

  find(locale: string): Observable<TranslateDto> {
    return from(
      this.collection.doc(locale).get(),
    ).pipe(
      map((r: any) => r.data() as TranslateDto),
    );
  }

  create(locale: string, dto: TranslateDto): Observable<TranslateDto> {
    return from(
      this.collection.doc(locale).set(dto),
    ).pipe(map(_ => dto));
  }

  update(locale: string, dto: TranslateDto): Observable<TranslateDto> {
    return from(
      this.collection.doc(locale).set(dto),
    ).pipe(map(_ => dto));
  }

  delete(locale: string): Observable<any> {
    return from(
      this.collection.doc(locale).delete(),
    );
  }
}

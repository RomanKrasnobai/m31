import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class LookupDataService<T> {
  abstract getAll(filter?: any): Observable<T[]>;
}

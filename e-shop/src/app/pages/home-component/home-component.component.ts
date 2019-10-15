import {Component, OnDestroy, OnInit} from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/models/item';
import {MatDialog} from '@angular/material';
import {BasketComponentComponent} from '../basket-component/basket-component.component';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  ngOnDestroy$ = new Subject();

  data: Array<Item>;

  constructor(private itemsService: ItemsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.itemsService.getAll().pipe(
      takeUntil(this.ngOnDestroy$),
      tap(items => {
        this.data = items;
      }
    )).subscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(BasketComponentComponent, {
      width: '550px',
    });
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(true);
    this.ngOnDestroy$.complete();
  }
}

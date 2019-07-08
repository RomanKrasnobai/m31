import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { ItemsService } from '../items.service';
import { Item, ItemCategory } from '../item.model';
import { AppService } from '../../app.service';
import {
  AlertDialogComponent,
  AlertDialogButtonCode,
  AlertDialogButtonColor,
  AlertDialogData
} from '../../core/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Item>;
  saveButtonHidden: boolean;
  displayedColumns: Array<string> = ['name', 'category', 'price', 'menu'];

  get loading(): boolean {
    return this.appService.loading$.getValue();
  }

  set loading(value: boolean) {
    this.appService.loading$.next(value);
  }

  get lang(): string {
    return this.translate.currentLang || this.translate.defaultLang;
  }

  get currencyMask() {
    return this.appService.currencyMask;
  }

  get currencySuffix(): string {
    return this.appService.currencySuffix;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private translate: TranslateService,
    private appService: AppService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    setTimeout(() => this.loadData(), 100);
  }

  loadData() {
    this.loading = true;
    this.itemsService.getAll()
      .subscribe(data => {
        this.loading = false;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }

  getDisplayName(item: Item): string {
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    const name = item && item.name || '';
    return name.constructor === String ? name : name[currentLang] || '';
  }

  getCategoryDisplayValue(category: ItemCategory): string {
    let res = '';
    if (category) {
      res = category[this.lang] || category.ua;
    }
    return res;
  }

  onNewButtonClick() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  edit(item: Item) {
    this.router.navigate(['edit', item.id], { relativeTo: this.route });
  }

  onRemoveButtonClick(item: Item) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: '',
        message: 'common.remove-confirm',
        buttons: [
          {
            buttonCode: AlertDialogButtonCode.Yes,
            color: AlertDialogButtonColor.Primary
          },
          {
            buttonCode: AlertDialogButtonCode.No
          }
        ],
        type: null
      } as AlertDialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === AlertDialogButtonCode.Yes) {
        this.remove(item);
      }
    });
  }

  private remove(item: Item) {
    this.loading = true;
    this.itemsService.delete(item.id).subscribe(() => this.loadData());
  }

}

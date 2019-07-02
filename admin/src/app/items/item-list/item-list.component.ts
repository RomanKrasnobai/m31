import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { ItemsService } from '../items.service';
import { Item, ItemCategory } from '../item.model';
import { AppService } from '../../app.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private translate: TranslateService,
    private appService: AppService,
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

  edit(element: any) {
    this.router.navigate(['edit', element.id], { relativeTo: this.route });
  }

  remove(element: any) {
    this.loading = true;
    this.itemsService.delete(element.id).subscribe(() => this.loadData());
  }

}

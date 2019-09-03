import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Order } from '../order.model';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/app.service';
import {
  AlertDialogComponent,
  AlertDialogButtonCode,
  AlertDialogButtonColor,
  AlertDialogData
} from 'src/app/core/alert-dialog/alert-dialog.component';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Order>;
  saveButtonHidden: boolean;
  displayedColumns: Array<string> = ['number', 'date', 'status', 'customerName', 'customerPhone', 'menu'];

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
    private ordersService: OrdersService,
    private translate: TranslateService,
    private appService: AppService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    setTimeout(() => this.loadData(), 100);
  }

  loadData() {
    this.loading = true;
    this.ordersService.getAll()
      .subscribe(data => {
        this.loading = false;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
  }

  onNewButtonClick() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  edit(order: Order) {
    this.router.navigate(['edit', order.id], { relativeTo: this.route });
  }

  onRemoveButtonClick(order: Order) {
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
        this.remove(order);
      }
    });
  }

  getDate(src: { seconds: number}): Date {
    return src ? new Date(src.seconds) : null;
  }

  getCustomerName(customer: Customer): string {
    const { firstName, lastName } = customer;
    return `${firstName || ''} ${lastName || ''}`.trim();
  }

  private remove(order: Order) {
    this.loading = true;
    this.ordersService.delete(order.id).subscribe(() => this.loadData());
  }

}

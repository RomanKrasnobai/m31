import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { tap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { Order } from '../order.model';
import { OrdersService } from '../orders.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.sass']
})
export class OrderPageComponent implements OnInit {

  saveButtonDisabled: boolean;

  textareaStyle = {
    resize: 'none',
    height: '14rem',
  };

  public form: FormGroup;
  public id: string;

  private entity: Order;
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: (ev: MediaQueryListEvent) => void;

  get saveButtonEnabled(): boolean {
    return this.form && this.form.valid;
  }

  public get isMobile(): boolean {
    return this.mobileQuery && this.mobileQuery.matches;
  }

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private translate: TranslateService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = _ => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        setTimeout(_ => this.loadEntity(id), 100);
      }
    });
  }

  getCollSpan(value: number): number {
    return this.isMobile ? 1 : value;
  }

  onBackButtonClick() {
    this.router.navigate(['.'], { relativeTo: this.route.parent });
  }

  onSaveButtonClick() {
    this.save();
  }

  private initForm() {
    const fb = this.formBuilder;
    this.form = fb.group({
      customer: fb.group({
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        email: null,
        address: null,
      }, [Validators.required]),
      cart: fb.array([], [Validators.required]),
      deliveryInfo: fb.group({
        method: [null, [Validators.required]],
        info: [null, [Validators.required]],
        date: [new Date(), [Validators.required]],
      }, [Validators.required]),
      paymentMethod: [null, [Validators.required]]
    });
  }

  private loadEntity(id: string) {
    this.loading = true;
    this.ordersService.getById(id)
      .subscribe(entity => {
        this.entity = entity;
        this.form.patchValue(entity);
        this.loading = false;
      });
  }

  private save() {
    if (this.form.invalid) {
      return;
    }
    const dto = Object.assign({}, this.entity, this.form.value);
    this.loading = true;
    this.saveButtonDisabled = true;
    const query = this.id
      ? this.ordersService.update(this.id, dto)
      : this.ordersService.create(dto).pipe(
        tap(item => {
          this.router.navigate(['edit', item.id], { relativeTo: this.route.parent });
        })
      );
    const subscribeFn = () => {
      this.saveButtonDisabled = false;
      this.loading = false;
    };
    query.subscribe(subscribeFn, subscribeFn);
  }

}

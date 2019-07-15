import { DeliveryMethod } from './../delivery-info.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { tap, filter } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { Order } from '../order.model';
import { OrdersService } from '../orders.service';
import { AppService } from 'src/app/app.service';
import { PaymentMethod } from '../payment-method.enum';
import { NovaPoshtaService } from 'src/app/core/nova_poshta.service';
import { Area } from 'src/app/core/models/area.model';
import { City } from 'src/app/core/models/city.model';
import { Warehouse } from 'src/app/core/warehouse.model';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.sass']
})
export class OrderPageComponent implements OnInit {

  // #region Fields: Public
  saveButtonDisabled: boolean;

  textareaStyle = {
    resize: 'none',
    height: '14rem',
  };

  paymentMethods = [
    {
      value: PaymentMethod.Cash,
      displayValue: 'order.payment-method.cash'
    },
    {
      value: PaymentMethod.PbCard,
      displayValue: 'order.payment-method.private_bank_card'
    },
  ];
  deliveryMethods = [
    {
      value: DeliveryMethod.NovaPoshta,
      displayValue: 'order.delivery-method.nova-poshta'
    },
    {
      value: DeliveryMethod.Pickup,
      displayValue: 'order.delivery-method.pickup'
    },
  ];

  form: FormGroup;
  novaPoshtaForm: FormGroup;
  id: string;
  areas: Area[];
  cities: City[];
  warehouses: Warehouse[];
  DeliveryMethods = DeliveryMethod;
  // #endregion

  private entity: Order;
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: (ev: MediaQueryListEvent) => void;

  // #region Accessors: Public
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

  get cardNumberVisible(): boolean {
    const paymentMethodCtrl = this.form && this.form.get('paymentMethod');
    const paymentMethod = paymentMethodCtrl && paymentMethodCtrl.value as PaymentMethod;
    return paymentMethod === PaymentMethod.PbCard;
  }

  get deliveryMethod(): DeliveryMethod {
    const deliveryInfoForm = this.form && this.form.get('deliveryInfo');
    const deliveryMethod = deliveryInfoForm && deliveryInfoForm.get('method').value as DeliveryMethod;
    return deliveryMethod;
  }
  // #endregion

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private novaPoshtaService: NovaPoshtaService,
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
    this.initForms();
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

  getCityDisplayValue(city: City): string {
    let res = '';
    if (city) {
      const settlementType = city.SettlementTypeDescription || '';
      const description = city.Description;
      res = `${settlementType} ${description}`;
    }
    return res.trim();
  }

  getWarehouseDisplayValue(warehouse: Warehouse): string {
    let res = '';
    if (warehouse) {
      const warehouseNumber = warehouse.Number || '';
      const description = warehouse.Description;
      res = `(${warehouseNumber}) ${description}`;
    }
    return res.trim();
  }

  private initForms() {
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
      paymentMethod: [PaymentMethod.PbCard, [Validators.required]]
    });
    this.novaPoshtaForm = fb.group({
      area: [null, [Validators.required]],
      city: [null, [Validators.required]],
      warehouse: [null, [Validators.required]],
      warehouseId: null,
    });
    this.setNovaPoshtaFormEventsHandlers();
  }

  private setNovaPoshtaFormEventsHandlers() {
    this.form.get('deliveryInfo').get('method').valueChanges.pipe(
      filter(() => !this.areas)
    ).subscribe(() => this.loadAreas());
    this.novaPoshtaForm.get('area').valueChanges.subscribe(
      areaRef => this.loadCities(areaRef)
    );
    this.novaPoshtaForm.get('city').valueChanges.subscribe(
      cityRef => this.loadWarehouses(cityRef)
    );
  }

  private loadAreas() {
    this.loading = true;
    this.novaPoshtaService.getAreas().subscribe(areas => {
      this.areas = areas;
      this.loading = false;
    }, e => {
      this.loading = false;
      throw e;
    });
  }

  private loadCities(areaRef: string) {
    this.loading = true;
    this.novaPoshtaService.getCities(areaRef).subscribe(cities => {
      this.cities = this.sortCities(cities);
      this.loading = false;
    }, e => {
      this.loading = false;
      throw e;
    });
  }

  private loadWarehouses(cityRef: string) {
    this.loading = true;
    this.novaPoshtaService.getWarehouses(cityRef).subscribe(warehouses => {
      this.warehouses = warehouses;
      this.loading = false;
    }, e => {
      this.loading = false;
      throw e;
    });
  }

  private sortCities(cities: City[]): City[] {
    if (!Array.isArray(cities)) {
      return cities;
    }
    return cities.sort((a, b) => a.Description.localeCompare(b.Description));
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

import { DeliveryMethod } from './../delivery-info.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { tap, filter, map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { Order } from '../order.model';
import { OrdersService } from '../orders.service';
import { AppService } from 'src/app/app.service';
import { PaymentMethod } from '../payment-method.enum';
import { NovaPoshtaService } from 'src/app/core/nova_poshta.service';
import { Area } from 'src/app/core/models/area.model';
import { City } from 'src/app/core/models/city.model';
import { Warehouse } from 'src/app/core/warehouse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.sass'],
})
export class OrderPageComponent implements OnInit {

  // #region Fields: Public
  saveButtonDisabled: boolean;
  env = environment;

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
  cities$: Observable<City[]>;
  warehouses$: Observable<Warehouse[]>;
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

  get cartControls(): FormGroup[] {
    return this.form && (this.form.get('cart') as FormArray).controls as FormGroup[];
  }

  get orderItemsDisplayedColumns(): any[] {
    return [
      { path: `name.${this.lang.toLowerCase()};name`, title: 'items.caption.name' },
      { path: 'price', title: 'items.caption.price' }
    ];
  }

  get orderItemsDisplayPropertyName(): string {
    return [
      `name.${this.lang.toLowerCase()}`,
      'name'
    ].join(';');
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
    this.cities$ = this.getCitiesStream();
    this.warehouses$ = this.getWarehousesStream();
  }

  getCitiesStream(): Observable<City[]> {
    return this.novaPoshtaForm.get('city').valueChanges.pipe(
      filter(
        () => Array.isArray(this.cities)
      ),
      map(
        inputCity => inputCity ? this.getFilteredCities(inputCity) : this.cities.slice())
      );
  }

  getFilteredCities(inputCity): City[] {
    const reqExp = new RegExp(inputCity, 'i');
    return this.cities
      .filter(
        city => reqExp.test(city.Description) || reqExp.test(city.DescriptionRu)
    );
  }

  getWarehousesStream(): Observable<Warehouse[]> {
    return this.novaPoshtaForm.get('warehouse').valueChanges.pipe(
      filter(() => Array.isArray(this.warehouses)),
      map(inputWarehouse => inputWarehouse ? this.getFilteredWarehouses(inputWarehouse) : this.warehouses.slice()));
  }

  getFilteredWarehouses(inputWarehouse): Warehouse[] {
    const reqExp = new RegExp(inputWarehouse, 'i');
    return this.warehouses
      .filter(
        warehouse => reqExp.test(warehouse.Number.toString())
          || reqExp.test(warehouse.Description)
          || reqExp.test(warehouse.DescriptionRu)
      );
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

  appendCartItemControl() {
    this.cartControls.push(this.getItemControlGroup());
  }

  removeCartItem(index: number) {
    this.cartControls.splice(index, 1);
  }

  onCitySelected(event: MatAutocompleteSelectedEvent) {
    const city = event.option.value as City;
    this.loadWarehouses(city.Ref);
  }

  onWarehouseSelected(event: MatAutocompleteSelectedEvent) {
    const warehouse = event.option.value as Warehouse;
    // TODO: Display Warehouse information
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

  private getItemControlGroup(values?) {
    return this.formBuilder.group({
      item: [null, [Validators.required]],
      qty: [1, [Validators.min(1), Validators.required]]
    });
  }

  private setNovaPoshtaFormEventsHandlers() {
    this.form.get('deliveryInfo').get('method').valueChanges.pipe(
      filter(() => this.deliveryMethod === this.DeliveryMethods.NovaPoshta && !this.cities)
    ).subscribe(() => {
      this.novaPoshtaForm.patchValue({ city: null });
      this.loadCities();
    });
  }

  private loadAreas() {
    this.loading = true;
    this.novaPoshtaService.getAreas().subscribe(areas => {
      this.areas = areas;
      this.novaPoshtaForm.patchValue({ city: null });
      this.loading = false;
    }, e => {
      this.loading = false;
      throw e;
    });
  }

  private loadCities(areaRef?: string) {
    this.loading = true;
    this.novaPoshtaService.getCities(areaRef)
    .pipe(
      map(
        data => data.map(
          cityRaw => Object.assign(new City(), cityRaw)
        )
      )
    )
    .subscribe(cities => {
      this.cities = this.sortCities(cities);
      this.novaPoshtaForm.patchValue({ warehouse: null, city: null });
      this.loading = false;
    }, e => {
      this.loading = false;
      throw e;
    });
  }

  private loadWarehouses(cityRef: string) {
    this.loading = true;
    this.novaPoshtaService.getWarehouses(cityRef)
    .pipe(
      map(
        data => data.map(
          warehouseRaw => Object.assign(new Warehouse(), warehouseRaw)
        )
      )
    )
    .subscribe(warehouses => {
      this.warehouses = warehouses;
      this.novaPoshtaForm.patchValue({ warehouse: null });
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
    console.log(this.form.getRawValue());
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

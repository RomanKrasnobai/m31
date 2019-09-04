import { DeliveryMethod } from './../delivery-info.model';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { tap, filter, map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { Order } from '../order.model';
import { OrdersService } from '../orders.service';
import { AppService } from 'src/app/app.service';
import { PaymentMethod } from '../payment-method.enum';
import { NovaPoshtaService } from 'src/app/core/nova-poshta.service';
import { City } from 'src/app/core/models/city.model';
import { Warehouse } from 'src/app/core/models/warehouse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cart } from '../cart.model';
import { OrderItem } from '../order-item.model';
import { OrderStatus } from '../order-status.enum';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.sass'],
})
export class OrderPageComponent implements OnInit {

  // #region Fields: Public
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
  cities: City[];
  warehouses: Warehouse[];
  DeliveryMethods = DeliveryMethod;
  cities$: Observable<City[]>;
  warehouses$: Observable<Warehouse[]>;
  // #endregion

  private entity: Order;
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: (ev: MediaQueryListEvent) => void;
  private saveButtonSubmitted: boolean;

  // #region Accessors: Public
  get saveButtonEnabled(): boolean {
    return !this.saveButtonSubmitted && this.form && this.form.valid;
  }

  get saveButtonDisabled(): boolean {
    return !this.saveButtonEnabled;
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

  get deliveryInfoForm(): FormGroup {
    return this.form && this.form.get('deliveryInfo') as FormGroup;
  }

  get deliveryMethod(): DeliveryMethod {
    const deliveryMethod = this.deliveryInfoForm && this.deliveryInfoForm.get('method').value as DeliveryMethod;
    return deliveryMethod;
  }

  get cartFormArray(): FormArray {
    return this.form && this.form.get('cart') as FormArray;
  }

  get cartControls(): FormGroup[] {
    return this.cartFormArray && this.cartFormArray.controls as FormGroup[];
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

  get status(): OrderStatus {
    const entityStatus = this.entity && this.entity.status;
    const formStatus = this.form && +this.form.get('status').value as OrderStatus;
    return formStatus === null ? entityStatus : formStatus;
  }

  get inProgressButtonVisible(): boolean {
    return !!this.id && [
      OrderStatus.InProgress,
      OrderStatus.Delivering,
      OrderStatus.Closed,
      OrderStatus.Canceled
    ].indexOf(this.status) === -1;
  }

  get deliveringButtonVisible(): boolean {
    return this.status === OrderStatus.InProgress;
  }

  get closeButtonVisible(): boolean {
    return this.status === OrderStatus.Delivering;
  }

  get cancelButtonVisible(): boolean {
    return !!this.id && [
      OrderStatus.Closed,
      OrderStatus.Canceled
    ].indexOf(this.status) === -1;
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
    if (!inputCity || inputCity.constructor !== String) {
      return [];
    }
    const inputCityLc = inputCity.toLowerCase().trim();
    const reqExp = new RegExp(inputCity, 'i');
    return this.cities
      .filter(
        city => reqExp.test(city.Description) || reqExp.test(city.DescriptionRu)
      )
      .map(city => ({
        equal: city.Description.toLowerCase() === inputCityLc || city.DescriptionRu.toLowerCase() === inputCityLc,
        city
      }))
      .sort((a, b) => a.equal === b.equal ? 1 : -1)
      .map(x => x.city);
  }

  getWarehousesStream(): Observable<Warehouse[]> {
    return this.novaPoshtaForm.get('warehouse').valueChanges.pipe(
      filter(() => Array.isArray(this.warehouses)),
      map(inputWarehouse => inputWarehouse ? this.getFilteredWarehouses(inputWarehouse) : this.warehouses.slice()));
  }

  getFilteredWarehouses(inputWarehouse): Warehouse[] {
    if (!inputWarehouse || inputWarehouse.constructor !== String) {
      return [];
    }
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
    this.cartFormArray.push(this.getItemControlGroup());
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

  onInProgressButtonClick() {
    this.form.patchValue({ status: OrderStatus.InProgress });
    this.save();
  }

  onDeliveringButtonClick() {
    this.form.patchValue({ status: OrderStatus.Delivering });
    this.save();
  }

  onCloseButtonClick() {
    this.form.patchValue({ status: OrderStatus.Closed });
    this.save();
  }

  onCancelButtonClick() {
    this.form.patchValue({ status: OrderStatus.Canceled });
    this.save();
  }

  private initForms() {
    const fb = this.formBuilder;
    this.form = fb.group({
      number: [null],
      date: [new Date()],
      status: [OrderStatus.New],
      customer: fb.group({
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        email: null,
        address: null,
      }, [Validators.required]),
      cart: fb.array([], this.getCartValidator()),
      deliveryInfo: fb.group({
        method: [null, [Validators.required]],
        info: [null, [this.getDeliveryInfoValidator()]],
        date: [new Date(), [Validators.required]],
      }, { validators: this.getDeliveryInfoFormValidator() }),
      paymentMethod: [null, [Validators.required]]
    });
    this.novaPoshtaForm = fb.group({
      city: [null, [Validators.required]],
      warehouse: [null, [Validators.required]]
    });
    this.setNovaPoshtaFormEventsHandlers();
  }

  private getCartValidator(): ValidatorFn {
    const validator = control => {
      const formArray = control as FormArray;
      const valid = formArray.controls.length > 0 && formArray.controls.every(c => c.valid);
      return valid ? null : { required: true };
    };
    return validator;
  }

  private getDeliveryInfoFormValidator(): ValidatorFn {
    const validator = control => {
      const formGroup = control as FormGroup;
      const valid = formGroup.valid;
      return valid ? null : { required: true };
    };
    return validator;
  }

  private getDeliveryInfoValidator(): ValidatorFn {
    const validator = control => {
      let errors = null;
      if (this.deliveryMethod === DeliveryMethod.NovaPoshta) {
        errors = control.value && control.value.warehouse ? null : { required: true };
      }
      return errors;
    };
    return validator;
  }

  private getItemControlGroup(values?: any) {
    const itemValue = values && values.item || null;
    const itemQty = values && values.qty || null;
    const form = this.formBuilder.group({
      item: [itemValue, [Validators.required]],
      qty: [itemQty, [Validators.min(1), Validators.required]]
    });
    return form;
  }

  private setNovaPoshtaFormEventsHandlers() {
    this.novaPoshtaForm.valueChanges.subscribe(info => this.deliveryInfoForm.patchValue({ info }));
    this.form.get('deliveryInfo').get('method').valueChanges.pipe(
      filter(() => this.deliveryMethod === this.DeliveryMethods.NovaPoshta && !this.cities)
    ).subscribe(() => {
      this.novaPoshtaForm.patchValue({ city: null });
      this.loadCities();
    });
  }

  private loadCities(background?: boolean) {
    if (!background) {
      this.loading = true;
    }
    this.novaPoshtaService.getCities()
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
        this.setCartFormValues(entity);
        this.setNPFormValues(entity);
        this.loading = false;
      });
  }

  private setCartFormValues(entity: Order) {
    if (!entity || !Array.isArray(entity.cart)) {
      return;
    }
    entity.cart.forEach(element => {
      const formGroup = this.getItemControlGroup(element);
      this.cartFormArray.push(formGroup);
    });
  }

  private setNPFormValues(entity: Order) {
    if (entity.deliveryInfo.method === DeliveryMethod.NovaPoshta) {
      const info = entity.deliveryInfo.info;
      const warehouse = Object.assign(new Warehouse(), info.warehouse);
      info.warehouse = warehouse;
      this.novaPoshtaForm.patchValue(info);
    }
  }

  private save() {
    if (this.form.invalid) {
      return;
    }
    const dto = Object.assign({}, this.entity, this.form.value);
    this.loading = true;
    this.saveButtonSubmitted = true;
    const query = this.id
      ? this.ordersService.update(this.id, dto)
      : this.ordersService.create(dto).pipe(
        tap(item => {
          this.router.navigate(['edit', item.id], { relativeTo: this.route.parent });
        })
      );
    const subscribeFn = () => {
      this.saveButtonSubmitted = false;
      this.loading = false;
    };
    query.subscribe(subscribeFn, subscribeFn);
  }

}

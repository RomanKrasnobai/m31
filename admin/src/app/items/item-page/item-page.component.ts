import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { ItemsService } from '../items.service';
import { Item, ItemCategory } from '../item.model';
import { AppService } from '../../app.service';
import { ItemCategoryService } from '../item-category.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.sass']
})
export class ItemPageComponent implements OnInit {

  saveButtonDisabled: boolean;

  textareaStyle = {
    resize: 'none',
    height: '14rem',
  };

  public form: FormGroup;
  public id: string;
  public categories: Array<ItemCategory>;

  private entity: Item;
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
    private itemsService: ItemsService,
    private categoryService: ItemCategoryService,
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
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
  }

  getCollSpan(value: number): number {
    return this.isMobile ? 1 : value;
  }

  getCategoryDisplayValue(category: ItemCategory): string {
    let res = '';
    if (category) {
      res = category[this.lang] || category.ua;
    }
    return res;
  }

  onBackButtonClick() {
    this.router.navigate(['.'], { relativeTo: this.route.parent });
  }

  onSaveButtonClick() {
    this.save();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      categoryCode: [null, Validators.required],
      price: [null, Validators.required],
      description: [null],
      image: [null],
    });
  }

  private loadEntity(id: string) {
    this.loading = true;
    this.itemsService.getById(id)
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
    const categoryCodeCtrl = this.form.get('categoryCode');
    const category = this.categories.find(c => c.id === categoryCodeCtrl.value);
    const priceCtrl = this.form.get('price');
    const priceExec = /\d+\.{0,1}\d+/.exec(priceCtrl.value);
    const price = Number.parseFloat(priceExec ? priceExec[0] : '0') || 0;
    const dto = Object.assign({}, this.entity, this.form.value, { price, category });
    this.loading = true;
    this.saveButtonDisabled = true;
    const query = this.id
      ? this.itemsService.update(this.id, dto)
      : this.itemsService.create(dto).pipe(
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

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { tap } from 'rxjs/operators';

import { ItemsService } from '../items.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.sass']
})
export class ItemPageComponent implements OnInit {

  saveButtonDisabled: boolean;

  public form: FormGroup;
  public id: string;

  private entity: Item;
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: (ev: MediaQueryListEvent) => void;

  get saveButtonEnabled(): boolean {
    return this.form && this.form.valid;
  }

  public get isMobile(): boolean {
    return this.mobileQuery && this.mobileQuery.matches;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemsService: ItemsService,
    private formBuilder: FormBuilder,
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
        this.loadEntity(id);
      }
    });
  }

  onBackButtonClick() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSaveButtonClick() {
    this.save();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      price: [null, Validators.required],
      description: [null],
      image: [null],
    });
  }

  private loadEntity(id: string) {
    this.itemsService.getById(id)
      .subscribe(entity => {
        this.entity = entity;
        this.form.patchValue(entity);
      });
  }

  private save() {
    if (this.form.invalid) {
      return;
    }
    const dto = Object.assign({}, this.entity, this.form.value);
    this.saveButtonDisabled = true;
    const query = this.id
      ? this.itemsService.update(this.id, dto)
      : this.itemsService.create(dto).pipe(
        tap(id => {
          this.router.navigate(['edit', id], { relativeTo: this.route.parent });
        })
      );
    query.subscribe(
      () => this.saveButtonDisabled = true
    );
  }

}

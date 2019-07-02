import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';

import { Category } from '../category.model';
import { CategoriesService } from '../categories.service';

export class GridCategory extends Category {
  _isNew?: boolean;
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<GridCategory>;
  saveButtonHidden: boolean;
  displayedColumns: Array<string> = ['id', 'ua', 'en', 'menu'];
  controls: FormArray;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.categoriesService.getAll()
      .subscribe(data => {
        this.controls = this.fb.array(data.map(x => this.createControl(x)));
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.loading = false;
      });
  }

  createControl(value: GridCategory) {
    return this.fb.group({
      id: [value && value.id || null, [Validators.required]],
      ua: [value && value.ua || null, [Validators.required]],
      en: [value && value.en || null, [Validators.required]],
      _isNew: Boolean(value && value._isNew)
    });
  }

  getControl(index, fieldName): FormControl {
    return this.controls.at(index).get(fieldName) as FormControl;
  }

  getControlGroup(index): FormGroup {
    return this.controls.at(index) as FormGroup;
  }

  onNewButtonClick() {
    const data = this.dataSource.data;
    data.push({ _isNew: true } as GridCategory);
    this.controls = this.fb.array(data.map(x => this.createControl(x)));
    this.dataSource.data = data;
  }

  onSaveButtonClick(index: number) {
    const formGroup = this.getControlGroup(index);
    const category = formGroup.getRawValue() as GridCategory;
    if (formGroup.invalid) {
      return;
    }
    this.loading = true;
    this.categoriesService.set(category.id, {
      ua: category.ua,
      en: category.en,
    } as Category).subscribe(_ => this.loadData());
  }

  remove(index: number) {
    const category = this.getControlGroup(index).getRawValue() as GridCategory;
    if (category._isNew) {
      const data = this.dataSource.data;
      const idx = data.indexOf(category);
      data.splice(idx, 1);
      this.dataSource.data = data;
    } else {
      this.loading = true;
      this.categoriesService.delete(category.id).subscribe(() => this.loadData());
    }
  }

}
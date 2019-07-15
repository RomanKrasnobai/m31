import { Component, OnInit, forwardRef, Input, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { LookupDialogComponent, DialogData } from '../lookup-dialog/lookup-dialog.component';

@Component({
  selector: 'app-lookup-control',
  templateUrl: './lookup-control.component.html',
  styleUrls: ['./lookup-control.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LookupControlComponent),
      multi: true
    }
  ],
})
export class LookupControlComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string;
  @Input() caption: string;
  @Input() propertyName: string;
  @Input() displayPropertyName: string;
  @Input() filters: any;
  @Input() displayedColumns: Array<{ path: string; title: string }>;
  value: any;
  disabled: boolean;
  onChange: (value: any) => void;
  onTouched: () => void;

  mobileQuery: MediaQueryList;
  private mobileQueryListener: (ev: MediaQueryListEvent) => void;

  public get isMobile(): boolean {
    return this.mobileQuery && this.mobileQuery.matches;
  }

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) { }

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = _ => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  writeValue(obj: any): void {
    this.value = obj || null;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setValue(value: any) {
    this.value = value;
    this.onChange(value);
  }

  onFocus() {
    this.onTouched();
  }

  openLookup() {
    this.openLookupDialog(this.displayedColumns)
    .subscribe(
      result => this.onLookupResult(result)
    );
  }

  openLookupDialog(displayedColumns: Array<{ path: string, title: string }>): Observable<any> {
    const dialogRef = this.dialog.open(LookupDialogComponent, {
      width: this.isMobile ? '320px' : '800px',
      data: {
        title: this.caption,
        displayedColumns,
        filters: this.filters,
      } as DialogData
    });
    return dialogRef.afterClosed();
  }

  onLookupResult(res) {
    if (res && res.cancel) {
      return;
    }
    this.value = res.result;
    this.onChange(res.result);
  }

  getDisplayValue(): string {
    if (!this.value) {
      return null;
    }
    const displayPropertyNames = this.displayPropertyName.split(';');
    for (const path  of displayPropertyNames) {
      const value = this.getValueByPath(this.value, path);
      if (value) {
        return value;
      }
    }
  }

  getValueByPath(value: any, path: string): any {
    const parts = path && path.split('.');
    if (parts && parts.length > 1) {
      return this.getValueByPath(value[parts[0]], parts.splice(1).join('.'));
    }
    return value[path];
  }

}

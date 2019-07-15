import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { take, finalize } from 'rxjs/operators';
import { LookupDataService } from './lookup-data.service';

export interface DialogData {
  title: string;
  displayedColumns: Array<{ path: string; title: string }>;
  filters?: any;
  result?: any;
}

@Component({
  selector: 'app-lookup-dialog',
  templateUrl: './lookup-dialog.component.html',
  styleUrls: ['./lookup-dialog.component.sass']
})
export class LookupDialogComponent<T> implements OnInit {

  public itemList: Array<T>;
  public loading: boolean;

  get displayedColumns(): Array<string> {
    const res = [...this.data.displayedColumns.map(c => c.path), 'menu'];
    return res;
  }

  constructor(
    public dialogRef: MatDialogRef<LookupDialogComponent<T>>,
    private lookupDataService: LookupDataService<T>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    setTimeout(() => this.loading = true, 100);
    this.lookupDataService.getAll().pipe(
      take(1),
      finalize(() => this.loading = false),
    ).subscribe(
      data => this.itemList = data
    );
  }

  onCancelClick(): void {
    this.dialogRef.close({ cancel: true });
  }

  onSubmit(result) {
    this.data.result = result;
    this.dialogRef.close({
      cancel: false,
      result
    });
  }

  getDisplayValue(value, propertyName): string {
    if (!value) {
      return null;
    }
    const propertyNames = propertyName.split(';');
    for (const path of propertyNames) {
      const retVal = this.getValueByPath(value, path);
      if (retVal) {
        return retVal;
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TextMaskModule } from 'angular2-text-mask';

import {
  MatButtonModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatTableModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatSelectModule,
  MatDialogModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTabsModule,
} from '@angular/material';

import { CoreTranslateService } from './translate.service';
import { ImageControlComponent } from './image-control/image-control.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { MultiLangInputComponent } from './multi-lang-input/multi-lang-input.component';
import { MultiLangTextareaComponent } from './multi-lang-textarea/multi-lang-textarea.component';
import { LookupControlComponent } from './lookup-control/lookup-control.component';
import { LookupDialogComponent } from './lookup-dialog/lookup-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `admin/assets/i18n/`);
}

@NgModule({
  declarations: [
    ImageControlComponent,
    AlertDialogComponent,
    MultiLangInputComponent,
    MultiLangTextareaComponent,
    LookupControlComponent,
    LookupDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatSortModule,
    MatTabsModule,

    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      // isolate: true
    }),
    TextMaskModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TextMaskModule,

    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatSortModule,
    MatTabsModule,

    ImageControlComponent,
    AlertDialogComponent,
    MultiLangInputComponent,
    MultiLangTextareaComponent,
    LookupControlComponent,
    LookupDialogComponent,
  ],
  entryComponents: [AlertDialogComponent, LookupDialogComponent],
  providers: [
    { provide: TranslateService, useClass: CoreTranslateService }
  ]
})
export class CoreModule { }

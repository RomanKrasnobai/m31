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
} from '@angular/material';

import { CoreTranslateService } from './translate.service';
import { ImageControlComponent } from './image-control/image-control.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'admin/assets/i18n/');
}

@NgModule({
  declarations: [ImageControlComponent, AlertDialogComponent],
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
    ImageControlComponent,
    AlertDialogComponent,
    TextMaskModule
  ],
  entryComponents: [AlertDialogComponent],
  providers: [
    { provide: TranslateService, useClass: CoreTranslateService }
  ]
})
export class CoreModule { }

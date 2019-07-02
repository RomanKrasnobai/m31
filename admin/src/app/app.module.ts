import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { CategoriesService } from './categories/categories.service';
import { ItemCategoryService } from './items/item-category.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    CoreModule
  ],
  providers: [
    { provide: ItemCategoryService, useClass: CategoriesService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

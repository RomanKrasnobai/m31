import { NgModule } from '@angular/core';
import { FooterComponent } from './footer-component/footer-component.component';
import { HeaderComponent } from './header-component/header-component.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from './left-menu/left-menu.component';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        LeftMenuComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
  exports: [
    FooterComponent,
    HeaderComponent,
    LeftMenuComponent
  ],
    providers: []
  })
  export class SharedComponentsModule { }

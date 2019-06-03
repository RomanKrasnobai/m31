import { NgModule } from '@angular/core';
import { FooterComponent } from './footer-component/footer-component.component';
import { HeaderComponent } from './header-component/header-component.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        FooterComponent,
        HeaderComponent
    ],
    providers: []
  })
  export class SharedComponentsModule { }

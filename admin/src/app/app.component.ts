import { Component, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy{

  @ViewChild('snav') snavRef: MatSidenav;

  mobileQuery: MediaQueryList;
  fillerNav: Array<{ title: string, path: string }> = [
    { title: 'common.menu.items', path: 'items' },
    { title: 'common.menu.orders', path: 'orders' },
    // { title: 'common.menu.translates', path: 'translates' },
  ];
  langs: Array<{ title: string, value: string }> = [
    { title: 'EN', value: 'en' },
    { title: 'UA', value: 'ua' },
  ];
  langControl = new FormControl();

  private mobileQueryListener: (ev: MediaQueryListEvent) => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = _ => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.setUpLang();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  navLinkClick() {
    if (this.mobileQuery.matches) {
      this.snavRef.close();
    }
  }

  setUpLang() {
    let lang = 'ua';
    if (localStorage) {
      const prefLang = localStorage.getItem('lang');
      if (prefLang) {
        lang = prefLang;
        this.translate.use(lang);
      }
    }
    this.translate.setDefaultLang(lang);
    this.langControl.setValue(lang);
    this.langControl.valueChanges.subscribe(l => this.onLangChange(l));
  }

  onLangChange(lang: string) {
    if (localStorage) {
      localStorage.setItem('lang', lang);
    }
    this.translate.use(lang);
  }

}

import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.sass']
})
export class HeaderComponent implements OnInit {

  languages: Array<{ title: string, value: string }> = [
    { title: 'UA', value: 'ua' },
    { title: 'EN', value: 'en' }
  ];

  routingTitle: Array<{ title: string, link: string }> = [
    {title: 'common.navigation.main', link: '/home'},
    {title: 'common.navigation.payment-delivery', link: '/payment-delivery'},
    {title: 'common.navigation.contacts', link: '/contacts'}
  ];

  langControl = new FormControl();

  constructor(private translate: TranslateService) {
    this.translate.addLangs(this.languages.map(lng => lng.value));
    this.setUpLang();
  }

  ngOnInit() {
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
    this.langControl.valueChanges.subscribe(lng => this.onLangChange(lng));
  }

  onLangChange(lang: string) {
    if (localStorage) {
      localStorage.setItem('lang', lang);
    }
    this.translate.use(lang);
  }
}

import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { MultiLangText } from '../models/multi-lang-text.model';

@Component({
  selector: 'app-multi-lang-input',
  templateUrl: './multi-lang-input.component.html',
  styleUrls: ['./multi-lang-input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiLangInputComponent),
      multi: true
    }
  ],
})
export class MultiLangInputComponent implements OnInit, ControlValueAccessor {

  @Input() disabled: boolean;
  @Input() placeholder: string;

  selectedLang: string;
  form: FormGroup;

  get langs(): string[] {
    return this.translate.getLangs();
  }

  private set value(value: MultiLangText) {
    if (value && this.form) {
      this.form.patchValue(value, { emitEvent: false });
    }
  }
  private get value(): MultiLangText {
    return this.form && this.form.getRawValue() as MultiLangText;
  }
  private onChange: (value: any) => void;
  private onTouched: () => void;

  constructor(private translate: TranslateService, private fb: FormBuilder) { }

  ngOnInit() {
    this.selectedLang = this.translate.currentLang || this.translate.defaultLang;
    this.initForm();
  }

  writeValue(obj: any): void {
    let value = null;
    if (obj) {
      value = obj.constructor === String ? { ua: obj } : obj;
    }
    this.value = value;

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

  emitOnTouch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  private initForm() {
    const langConfig = this.langs.reduce((config, lang) => {
      config[lang] = null;
      return config;
    }, {});
    this.form = this.fb.group(langConfig);
    this.form.valueChanges.subscribe(_ => {
      if (this.onChange) {
        this.onChange(this.value);
      }
    });
  }

}

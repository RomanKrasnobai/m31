import { Component, OnInit, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageControlComponent),
      multi: true
    }
  ],
})
export class ImageControlComponent implements OnInit, ControlValueAccessor {

  images: Array<string> = [];
  currentIndex = 0;
  disabled: boolean;
  onChange: (value: any) => void;
  onTouched: () => void;

  @ViewChild('addImgFile') addImgFileRef: ElementRef;
  @ViewChild('updateImgFile') updateImgFileRef: ElementRef;

  get value(): string {
    return this.images && this.images[this.currentIndex] || null;
  }
  get imageSrc(): string {
    let imageSrc = `${location.pathname}/assets/default_image.png`;
    if (this.value) {
      imageSrc = this.value;
    }
    return imageSrc;
  }

  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.images = obj ? Array.isArray(obj) ? obj : [obj] : [];
    this.currentIndex = 0;
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

  setValue(index: number) {
    this.currentIndex = index;
    if (this.onChange) {
      this.onChange(this.images);
    }
  }

  selectImage() {
    this.updateImgFileRef.nativeElement.click();
    if (this.onTouched) {
      this.onTouched();
    }
  }

  addImage() {
    this.addImgFileRef.nativeElement.click();
    if (this.onTouched) {
      this.onTouched();
    }
  }

  removeImage() {
    this.images.splice(this.currentIndex, 1);
    this.prevImage();
    this.setValue(this.currentIndex);
  }

  prevImage() {
    this.currentIndex = this.currentIndex ? this.currentIndex - 1 : this.currentIndex;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? this.currentIndex : this.currentIndex + 1;
  }

  async addImageSource(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        const imgSrc = await this.getBase64(file);
        this.images.push(imgSrc);
        this.setValue(this.images.length - 1);
      }
      fileInput.value = null;
    }
  }

  async updateImageSource(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];
    if (file) {
      const imgSrc = await this.getBase64(file);
      this.images[this.currentIndex] = imgSrc;
      this.setValue(this.currentIndex);
      fileInput.value = null;
    }
  }

  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result.toString());
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

}

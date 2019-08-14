import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponentComponent } from './basket-component.component';

describe('BasketComponentComponent', () => {
  let component: BasketComponentComponent;
  let fixture: ComponentFixture<BasketComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

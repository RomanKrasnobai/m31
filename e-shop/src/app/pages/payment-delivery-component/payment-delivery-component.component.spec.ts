import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDeliveryComponentComponent } from './payment-delivery-component.component';

describe('PaymentDeliveryComponentComponent', () => {
  let component: PaymentDeliveryComponentComponent;
  let fixture: ComponentFixture<PaymentDeliveryComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDeliveryComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDeliveryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

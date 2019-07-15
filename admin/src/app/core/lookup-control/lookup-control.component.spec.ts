import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupControlComponent } from './lookup-control.component';

describe('LookupControlComponent', () => {
  let component: LookupControlComponent;
  let fixture: ComponentFixture<LookupControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

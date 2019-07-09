import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLangTextareaComponent } from './multi-lang-textarea.component';

describe('MultiLangTextareaComponent', () => {
  let component: MultiLangTextareaComponent;
  let fixture: ComponentFixture<MultiLangTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLangTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLangTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

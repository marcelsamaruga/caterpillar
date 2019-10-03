import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepingComponent } from './sleeping.component';

describe('SleepingComponent', () => {
  let component: SleepingComponent;
  let fixture: ComponentFixture<SleepingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

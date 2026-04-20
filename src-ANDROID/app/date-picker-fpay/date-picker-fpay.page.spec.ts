import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerFpayPage } from './date-picker-fpay.page';

describe('DatePickerFpayPage', () => {
  let component: DatePickerFpayPage;
  let fixture: ComponentFixture<DatePickerFpayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DatePickerFpayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

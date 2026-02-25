import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentDaysPage } from './payment-days.page';

describe('PaymentDaysPage', () => {
  let component: PaymentDaysPage;
  let fixture: ComponentFixture<PaymentDaysPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentDaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

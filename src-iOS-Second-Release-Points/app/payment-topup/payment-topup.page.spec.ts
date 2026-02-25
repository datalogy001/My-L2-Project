import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentTopupPage } from './payment-topup.page';

describe('PaymentTopupPage', () => {
  let component: PaymentTopupPage;
  let fixture: ComponentFixture<PaymentTopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentTopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

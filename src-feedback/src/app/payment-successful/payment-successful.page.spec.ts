import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentSuccessfulPage } from './payment-successful.page';

describe('PaymentSuccessfulPage', () => {
  let component: PaymentSuccessfulPage;
  let fixture: ComponentFixture<PaymentSuccessfulPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentSuccessfulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

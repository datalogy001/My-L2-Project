import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentFailedPage } from './payment-failed.page';

describe('PaymentFailedPage', () => {
  let component: PaymentFailedPage;
  let fixture: ComponentFixture<PaymentFailedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentFailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

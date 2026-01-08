import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentDatatopupPage } from './payment-datatopup.page';

describe('PaymentDatatopupPage', () => {
  let component: PaymentDatatopupPage;
  let fixture: ComponentFixture<PaymentDatatopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentDatatopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

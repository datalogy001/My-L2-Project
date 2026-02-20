import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplitPaymentPage } from './split-payment.page';

describe('SplitPaymentPage', () => {
  let component: SplitPaymentPage;
  let fixture: ComponentFixture<SplitPaymentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SplitPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

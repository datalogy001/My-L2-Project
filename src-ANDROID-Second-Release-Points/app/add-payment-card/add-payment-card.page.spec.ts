import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPaymentCardPage } from './add-payment-card.page';

describe('AddPaymentCardPage', () => {
  let component: AddPaymentCardPage;
  let fixture: ComponentFixture<AddPaymentCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPaymentCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

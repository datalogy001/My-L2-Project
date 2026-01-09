import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutVerifcationPage } from './checkout-verifcation.page';

describe('CheckoutVerifcationPage', () => {
  let component: CheckoutVerifcationPage;
  let fixture: ComponentFixture<CheckoutVerifcationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CheckoutVerifcationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

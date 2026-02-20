import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCardFpayTopupWalletPage } from './add-card-fpay-topup-wallet.page';

describe('AddCardFpayTopupWalletPage', () => {
  let component: AddCardFpayTopupWalletPage;
  let fixture: ComponentFixture<AddCardFpayTopupWalletPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCardFpayTopupWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

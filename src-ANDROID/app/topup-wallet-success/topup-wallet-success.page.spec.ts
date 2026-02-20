import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupWalletSuccessPage } from './topup-wallet-success.page';

describe('TopupWalletSuccessPage', () => {
  let component: TopupWalletSuccessPage;
  let fixture: ComponentFixture<TopupWalletSuccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopupWalletSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

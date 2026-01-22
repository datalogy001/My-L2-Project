import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoucherTopupPage } from './voucher-topup.page';

describe('VoucherTopupPage', () => {
  let component: VoucherTopupPage;
  let fixture: ComponentFixture<VoucherTopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VoucherTopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

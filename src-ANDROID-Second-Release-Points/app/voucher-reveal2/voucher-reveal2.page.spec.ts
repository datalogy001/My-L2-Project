import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoucherReveal2Page } from './voucher-reveal2.page';

describe('VoucherReveal2Page', () => {
  let component: VoucherReveal2Page;
  let fixture: ComponentFixture<VoucherReveal2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VoucherReveal2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

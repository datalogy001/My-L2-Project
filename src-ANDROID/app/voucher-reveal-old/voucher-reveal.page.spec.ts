import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoucherRevealPage } from './voucher-reveal.page';

describe('VoucherRevealPage', () => {
  let component: VoucherRevealPage;
  let fixture: ComponentFixture<VoucherRevealPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VoucherRevealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

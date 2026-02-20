import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCouponaddedPage } from './modal-couponadded.page';

describe('ModalCouponaddedPage', () => {
  let component: ModalCouponaddedPage;
  let fixture: ComponentFixture<ModalCouponaddedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCouponaddedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

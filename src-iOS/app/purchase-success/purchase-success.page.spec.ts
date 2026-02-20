import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseSuccessPage } from './purchase-success.page';

describe('PurchaseSuccessPage', () => {
  let component: PurchaseSuccessPage;
  let fixture: ComponentFixture<PurchaseSuccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PurchaseSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

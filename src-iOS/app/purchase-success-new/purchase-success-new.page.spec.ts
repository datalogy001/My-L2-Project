import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseSuccessNewPage } from './purchase-success-new.page';

describe('PurchaseSuccessNewPage', () => {
  let component: PurchaseSuccessNewPage;
  let fixture: ComponentFixture<PurchaseSuccessNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PurchaseSuccessNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

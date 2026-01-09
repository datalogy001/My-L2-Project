import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BundleDataTopupPage } from './bundle-data-topup.page';

describe('BundleDataTopupPage', () => {
  let component: BundleDataTopupPage;
  let fixture: ComponentFixture<BundleDataTopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BundleDataTopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

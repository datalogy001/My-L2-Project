import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BundleDealsPage } from './bundle-deals.page';

describe('BundleDealsPage', () => {
  let component: BundleDealsPage;
  let fixture: ComponentFixture<BundleDealsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BundleDealsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

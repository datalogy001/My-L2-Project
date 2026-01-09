import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BundleSummaryPage } from './bundle-summary.page';

describe('BundleSummaryPage', () => {
  let component: BundleSummaryPage;
  let fixture: ComponentFixture<BundleSummaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BundleSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveBundleDetailPage } from './active-bundle-detail.page';

describe('ActiveBundleDetailPage', () => {
  let component: ActiveBundleDetailPage;
  let fixture: ComponentFixture<ActiveBundleDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ActiveBundleDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

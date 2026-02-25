import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BundlePage } from './bundle.page';

describe('BundlePage', () => {
  let component: BundlePage;
  let fixture: ComponentFixture<BundlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BundlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

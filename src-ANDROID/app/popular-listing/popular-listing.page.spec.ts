import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularListingPage } from './popular-listing.page';

describe('PopularListingPage', () => {
  let component: PopularListingPage;
  let fixture: ComponentFixture<PopularListingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PopularListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

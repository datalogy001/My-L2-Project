import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeSearchPage } from './home-search.page';

describe('HomeSearchPage', () => {
  let component: HomeSearchPage;
  let fixture: ComponentFixture<HomeSearchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

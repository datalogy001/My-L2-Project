import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCountryZonePage } from './search-country-zone.page';

describe('SearchCountryZonePage', () => {
  let component: SearchCountryZonePage;
  let fixture: ComponentFixture<SearchCountryZonePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchCountryZonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

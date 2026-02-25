import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllCountriesListPage } from './all-countries-list.page';

describe('AllCountriesListPage', () => {
  let component: AllCountriesListPage;
  let fixture: ComponentFixture<AllCountriesListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllCountriesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

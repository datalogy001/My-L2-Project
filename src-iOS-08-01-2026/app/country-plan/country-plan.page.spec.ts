import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryPlanPage } from './country-plan.page';

describe('CountryPlanPage', () => {
  let component: CountryPlanPage;
  let fixture: ComponentFixture<CountryPlanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CountryPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

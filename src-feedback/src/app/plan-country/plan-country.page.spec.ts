import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanCountryPage } from './plan-country.page';

describe('PlanCountryPage', () => {
  let component: PlanCountryPage;
  let fixture: ComponentFixture<PlanCountryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlanCountryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseCountryPage } from './choose-country.page';

describe('ChooseCountryPage', () => {
  let component: ChooseCountryPage;
  let fixture: ComponentFixture<ChooseCountryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChooseCountryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocailLoginCountryPhonePage } from './socail-login-country-phone.page';

describe('SocailLoginCountryPhonePage', () => {
  let component: SocailLoginCountryPhonePage;
  let fixture: ComponentFixture<SocailLoginCountryPhonePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SocailLoginCountryPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

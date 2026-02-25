import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryCodeModelPage } from './country-code-model.page';

describe('CountryCodeModelPage', () => {
  let component: CountryCodeModelPage;
  let fixture: ComponentFixture<CountryCodeModelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CountryCodeModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

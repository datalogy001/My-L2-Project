import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencySettingsPage } from './currency-settings.page';

describe('CurrencySettingsPage', () => {
  let component: CurrencySettingsPage;
  let fixture: ComponentFixture<CurrencySettingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CurrencySettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

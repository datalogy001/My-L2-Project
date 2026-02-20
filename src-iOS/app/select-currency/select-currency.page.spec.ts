import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectCurrencyPage } from './select-currency.page';

describe('SelectCurrencyPage', () => {
  let component: SelectCurrencyPage;
  let fixture: ComponentFixture<SelectCurrencyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectCurrencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

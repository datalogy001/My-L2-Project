import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditTopupPage } from './credit-topup.page';

describe('CreditTopupPage', () => {
  let component: CreditTopupPage;
  let fixture: ComponentFixture<CreditTopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreditTopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

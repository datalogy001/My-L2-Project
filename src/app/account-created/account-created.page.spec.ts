import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountCreatedPage } from './account-created.page';

describe('AccountCreatedPage', () => {
  let component: AccountCreatedPage;
  let fixture: ComponentFixture<AccountCreatedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccountCreatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

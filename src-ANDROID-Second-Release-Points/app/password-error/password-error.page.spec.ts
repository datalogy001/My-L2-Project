import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordErrorPage } from './password-error.page';

describe('PasswordErrorPage', () => {
  let component: PasswordErrorPage;
  let fixture: ComponentFixture<PasswordErrorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PasswordErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

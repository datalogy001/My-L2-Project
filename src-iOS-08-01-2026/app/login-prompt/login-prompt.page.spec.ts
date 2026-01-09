import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPromptPage } from './login-prompt.page';

describe('LoginPromptPage', () => {
  let component: LoginPromptPage;
  let fixture: ComponentFixture<LoginPromptPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginPromptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

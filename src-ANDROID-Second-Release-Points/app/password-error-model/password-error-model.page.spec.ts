import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordErrorModelPage } from './password-error-model.page';

describe('PasswordErrorModelPage', () => {
  let component: PasswordErrorModelPage;
  let fixture: ComponentFixture<PasswordErrorModelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PasswordErrorModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

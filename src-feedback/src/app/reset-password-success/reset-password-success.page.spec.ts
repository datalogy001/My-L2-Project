import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordSuccessPage } from './reset-password-success.page';

describe('ResetPasswordSuccessPage', () => {
  let component: ResetPasswordSuccessPage;
  let fixture: ComponentFixture<ResetPasswordSuccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResetPasswordSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

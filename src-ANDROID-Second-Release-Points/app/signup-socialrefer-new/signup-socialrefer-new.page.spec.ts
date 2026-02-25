import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupSocialreferNewPage } from './signup-socialrefer-new.page';

describe('SignupSocialreferNewPage', () => {
  let component: SignupSocialreferNewPage;
  let fixture: ComponentFixture<SignupSocialreferNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignupSocialreferNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

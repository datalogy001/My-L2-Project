import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupSocialreferPage } from './signup-socialrefer.page';

describe('SignupSocialreferPage', () => {
  let component: SignupSocialreferPage;
  let fixture: ComponentFixture<SignupSocialreferPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignupSocialreferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

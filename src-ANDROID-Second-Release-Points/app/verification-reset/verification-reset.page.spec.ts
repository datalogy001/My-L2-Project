import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationResetPage } from './verification-reset.page';

describe('VerificationResetPage', () => {
  let component: VerificationResetPage;
  let fixture: ComponentFixture<VerificationResetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerificationResetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

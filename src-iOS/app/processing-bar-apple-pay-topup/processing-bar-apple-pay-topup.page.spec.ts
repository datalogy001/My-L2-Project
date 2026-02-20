import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessingBarApplePayTopupPage } from './processing-bar-apple-pay-topup.page';

describe('ProcessingBarApplePayTopupPage', () => {
  let component: ProcessingBarApplePayTopupPage;
  let fixture: ComponentFixture<ProcessingBarApplePayTopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessingBarApplePayTopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

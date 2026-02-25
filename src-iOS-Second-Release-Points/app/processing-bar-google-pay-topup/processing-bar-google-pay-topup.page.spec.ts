import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessingBarGooglePayTopupPage } from './processing-bar-google-pay-topup.page';

describe('ProcessingBarGooglePayTopupPage', () => {
  let component: ProcessingBarGooglePayTopupPage;
  let fixture: ComponentFixture<ProcessingBarGooglePayTopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessingBarGooglePayTopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

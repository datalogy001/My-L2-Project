import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessingBarFpayTopupPage } from './processing-bar-fpay-topup.page';

describe('ProcessingBarFpayTopupPage', () => {
  let component: ProcessingBarFpayTopupPage;
  let fixture: ComponentFixture<ProcessingBarFpayTopupPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessingBarFpayTopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

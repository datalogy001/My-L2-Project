import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessingBarFpayPage } from './processing-bar-fpay.page';

describe('ProcessingBarFpayPage', () => {
  let component: ProcessingBarFpayPage;
  let fixture: ComponentFixture<ProcessingBarFpayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessingBarFpayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessingBarGooglePayPage } from './processing-bar-google-pay.page';

describe('ProcessingBarGooglePayPage', () => {
  let component: ProcessingBarGooglePayPage;
  let fixture: ComponentFixture<ProcessingBarGooglePayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessingBarGooglePayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

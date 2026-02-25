import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessingBarTlyncTopUpPayPage } from './processing-bar-tlync-top-up-pay.page';

describe('ProcessingBarTlyncTopUpPayPage', () => {
  let component: ProcessingBarTlyncTopUpPayPage;
  let fixture: ComponentFixture<ProcessingBarTlyncTopUpPayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessingBarTlyncTopUpPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

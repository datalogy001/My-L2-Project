import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessingBarTlyncPayPage } from './processing-bar-tlync-pay.page';

describe('ProcessingBarTlyncPayPage', () => {
  let component: ProcessingBarTlyncPayPage;
  let fixture: ComponentFixture<ProcessingBarTlyncPayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessingBarTlyncPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

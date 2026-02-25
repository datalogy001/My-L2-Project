import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessingBarApplepayPage } from './processing-bar-applepay.page';

describe('ProcessingBarApplepayPage', () => {
  let component: ProcessingBarApplepayPage;
  let fixture: ComponentFixture<ProcessingBarApplepayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessingBarApplepayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

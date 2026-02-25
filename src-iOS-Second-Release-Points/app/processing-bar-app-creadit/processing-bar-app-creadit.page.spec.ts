import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessingBarAppCreaditPage } from './processing-bar-app-creadit.page';

describe('ProcessingBarAppCreaditPage', () => {
  let component: ProcessingBarAppCreaditPage;
  let fixture: ComponentFixture<ProcessingBarAppCreaditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessingBarAppCreaditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

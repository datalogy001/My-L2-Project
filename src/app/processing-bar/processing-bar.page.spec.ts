import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessingBarPage } from './processing-bar.page';

describe('ProcessingBarPage', () => {
  let component: ProcessingBarPage;
  let fixture: ComponentFixture<ProcessingBarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProcessingBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

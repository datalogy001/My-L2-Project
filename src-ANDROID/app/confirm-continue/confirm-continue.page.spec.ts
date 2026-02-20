import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmContinuePage } from './confirm-continue.page';

describe('ConfirmContinuePage', () => {
  let component: ConfirmContinuePage;
  let fixture: ComponentFixture<ConfirmContinuePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfirmContinuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

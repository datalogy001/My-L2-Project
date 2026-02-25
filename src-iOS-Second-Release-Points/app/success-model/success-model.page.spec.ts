import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessModelPage } from './success-model.page';

describe('SuccessModelPage', () => {
  let component: SuccessModelPage;
  let fixture: ComponentFixture<SuccessModelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

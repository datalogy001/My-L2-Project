import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DelAccountPage } from './del-account.page';

describe('DelAccountPage', () => {
  let component: DelAccountPage;
  let fixture: ComponentFixture<DelAccountPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DelAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

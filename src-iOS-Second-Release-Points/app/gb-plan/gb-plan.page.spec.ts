import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GbPlanPage } from './gb-plan.page';

describe('GbPlanPage', () => {
  let component: GbPlanPage;
  let fixture: ComponentFixture<GbPlanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GbPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

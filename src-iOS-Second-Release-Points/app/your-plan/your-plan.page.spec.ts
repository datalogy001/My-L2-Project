import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourPlanPage } from './your-plan.page';

describe('YourPlanPage', () => {
  let component: YourPlanPage;
  let fixture: ComponentFixture<YourPlanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(YourPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

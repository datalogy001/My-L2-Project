import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoPlanPage } from './no-plan.page';

describe('NoPlanPage', () => {
  let component: NoPlanPage;
  let fixture: ComponentFixture<NoPlanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

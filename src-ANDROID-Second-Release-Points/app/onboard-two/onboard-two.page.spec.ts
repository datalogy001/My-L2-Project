import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardTwoPage } from './onboard-two.page';

describe('OnboardTwoPage', () => {
  let component: OnboardTwoPage;
  let fixture: ComponentFixture<OnboardTwoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OnboardTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

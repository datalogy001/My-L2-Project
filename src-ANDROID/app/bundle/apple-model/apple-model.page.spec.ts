import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppleModelPage } from './apple-model.page';

describe('AppleModelPage', () => {
  let component: AppleModelPage;
  let fixture: ComponentFixture<AppleModelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppleModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

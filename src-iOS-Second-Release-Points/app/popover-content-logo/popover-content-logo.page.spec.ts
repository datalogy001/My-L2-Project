import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverContentLogoPage } from './popover-content-logo.page';

describe('PopoverContentLogoPage', () => {
  let component: PopoverContentLogoPage;
  let fixture: ComponentFixture<PopoverContentLogoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PopoverContentLogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

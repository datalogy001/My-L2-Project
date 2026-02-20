import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstallationPage } from './installation.page';

describe('InstallationPage', () => {
  let component: InstallationPage;
  let fixture: ComponentFixture<InstallationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstallationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

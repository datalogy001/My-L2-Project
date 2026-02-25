import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceNotCompatiblePage } from './device-not-compatible.page';

describe('DeviceNotCompatiblePage', () => {
  let component: DeviceNotCompatiblePage;
  let fixture: ComponentFixture<DeviceNotCompatiblePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeviceNotCompatiblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

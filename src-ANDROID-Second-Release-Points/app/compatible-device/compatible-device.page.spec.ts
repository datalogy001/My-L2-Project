import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompatibleDevicePage } from './compatible-device.page';

describe('CompatibleDevicePage', () => {
  let component: CompatibleDevicePage;
  let fixture: ComponentFixture<CompatibleDevicePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompatibleDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermissionModalPage } from './permission-modal.page';

describe('PermissionModalPage', () => {
  let component: PermissionModalPage;
  let fixture: ComponentFixture<PermissionModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PermissionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

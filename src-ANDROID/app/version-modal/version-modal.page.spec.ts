import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VersionMOdalPage } from './version-modal.page';

describe('VersionMOdalPage', () => {
  let component: VersionMOdalPage;
  let fixture: ComponentFixture<VersionMOdalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VersionMOdalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstallEsimPage } from './install-esim.page';

describe('InstallEsimPage', () => {
  let component: InstallEsimPage;
  let fixture: ComponentFixture<InstallEsimPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstallEsimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

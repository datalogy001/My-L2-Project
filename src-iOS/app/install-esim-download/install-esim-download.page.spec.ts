import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstallEsimDownloadPage } from './install-esim-download.page';

describe('InstallEsimDownloadPage', () => {
  let component: InstallEsimDownloadPage;
  let fixture: ComponentFixture<InstallEsimDownloadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstallEsimDownloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

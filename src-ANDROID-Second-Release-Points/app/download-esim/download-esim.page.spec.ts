import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadEsimPage } from './download-esim.page';

describe('DownloadEsimPage', () => {
  let component: DownloadEsimPage;
  let fixture: ComponentFixture<DownloadEsimPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DownloadEsimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

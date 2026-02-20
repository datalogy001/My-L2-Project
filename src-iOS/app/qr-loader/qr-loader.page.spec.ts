import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrLoaderPage } from './qr-loader.page';

describe('QrLoaderPage', () => {
  let component: QrLoaderPage;
  let fixture: ComponentFixture<QrLoaderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrLoaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

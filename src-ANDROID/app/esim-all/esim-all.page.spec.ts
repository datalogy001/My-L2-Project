import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsimAllPage } from './esim-all.page';

describe('EsimAllPage', () => {
  let component: EsimAllPage;
  let fixture: ComponentFixture<EsimAllPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EsimAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

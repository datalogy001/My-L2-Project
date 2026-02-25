import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessModelEsimPage } from './success-model-esim.page';

describe('SuccessModelEsimPage', () => {
  let component: SuccessModelEsimPage;
  let fixture: ComponentFixture<SuccessModelEsimPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessModelEsimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

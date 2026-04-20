import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCountryOptPage } from './modal-country-opt.page';

describe('ModalCountryOptPage', () => {
  let component: ModalCountryOptPage;
  let fixture: ComponentFixture<ModalCountryOptPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCountryOptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

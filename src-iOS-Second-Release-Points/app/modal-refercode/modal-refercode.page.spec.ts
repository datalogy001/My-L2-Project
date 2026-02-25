import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalRefercodePage } from './modal-refercode.page';

describe('ModalRefercodePage', () => {
  let component: ModalRefercodePage;
  let fixture: ComponentFixture<ModalRefercodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalRefercodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

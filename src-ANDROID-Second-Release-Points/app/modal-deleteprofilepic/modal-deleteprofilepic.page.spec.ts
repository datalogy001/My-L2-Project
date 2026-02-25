import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDeleteprofilepicPage } from './modal-deleteprofilepic.page';

describe('ModalDeleteprofilepicPage', () => {
  let component: ModalDeleteprofilepicPage;
  let fixture: ComponentFixture<ModalDeleteprofilepicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalDeleteprofilepicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalLanguagechangePage } from './modal-languagechange.page';

describe('ModalLanguagechangePage', () => {
  let component: ModalLanguagechangePage;
  let fixture: ComponentFixture<ModalLanguagechangePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalLanguagechangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

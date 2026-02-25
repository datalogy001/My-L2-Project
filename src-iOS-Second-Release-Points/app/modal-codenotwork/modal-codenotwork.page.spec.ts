import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCodenotworkPage } from './modal-codenotwork.page';

describe('ModalCodenotworkPage', () => {
  let component: ModalCodenotworkPage;
  let fixture: ComponentFixture<ModalCodenotworkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCodenotworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

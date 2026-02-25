import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalNocreditBalancePage } from './modal-nocredit-balance.page';

describe('ModalNocreditBalancePage', () => {
  let component: ModalNocreditBalancePage;
  let fixture: ComponentFixture<ModalNocreditBalancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalNocreditBalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

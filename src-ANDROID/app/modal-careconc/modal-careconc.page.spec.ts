import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCareconcPage } from './modal-careconc.page';

describe('ModalCareconcPage', () => {
  let component: ModalCareconcPage;
  let fixture: ComponentFixture<ModalCareconcPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCareconcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalUploadProfileImagePage } from './modal-upload-profile-image.page';

describe('ModalUploadProfileImagePage', () => {
  let component: ModalUploadProfileImagePage;
  let fixture: ComponentFixture<ModalUploadProfileImagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalUploadProfileImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCardFpayPage } from './add-card-fpay.page';

describe('AddCardFpayPage', () => {
  let component: AddCardFpayPage;
  let fixture: ComponentFixture<AddCardFpayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCardFpayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

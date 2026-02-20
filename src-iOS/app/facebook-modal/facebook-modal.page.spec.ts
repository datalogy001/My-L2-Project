import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacebookModalPage } from './facebook-modal.page';

describe('FacebookModalPage', () => {
  let component: FacebookModalPage;
  let fixture: ComponentFixture<FacebookModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FacebookModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupNotAppliedModalPage } from './topup-not-applied-modal.page';

describe('TopupNotAppliedModalPage', () => {
  let component: TopupNotAppliedModalPage;
  let fixture: ComponentFixture<TopupNotAppliedModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopupNotAppliedModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

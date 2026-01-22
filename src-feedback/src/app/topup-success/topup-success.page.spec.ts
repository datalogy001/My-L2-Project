import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupSuccessPage } from './topup-success.page';

describe('TopupSuccessPage', () => {
  let component: TopupSuccessPage;
  let fixture: ComponentFixture<TopupSuccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopupSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

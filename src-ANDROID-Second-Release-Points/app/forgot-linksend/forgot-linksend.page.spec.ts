import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotLinksendPage } from './forgot-linksend.page';

describe('ForgotLinksendPage', () => {
  let component: ForgotLinksendPage;
  let fixture: ComponentFixture<ForgotLinksendPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ForgotLinksendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

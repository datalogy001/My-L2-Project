import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetYourBundlePage } from './get-your-bundle.page';

describe('GetYourBundlePage', () => {
  let component: GetYourBundlePage;
  let fixture: ComponentFixture<GetYourBundlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetYourBundlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

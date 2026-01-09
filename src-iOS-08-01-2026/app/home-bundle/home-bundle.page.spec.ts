import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeBundlePage } from './home-bundle.page';

describe('HomeBundlePage', () => {
  let component: HomeBundlePage;
  let fixture: ComponentFixture<HomeBundlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeBundlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

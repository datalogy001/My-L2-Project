import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoneBundlePage } from './zone-bundle.page';

describe('ZoneBundlePage', () => {
  let component: ZoneBundlePage;
  let fixture: ComponentFixture<ZoneBundlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ZoneBundlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

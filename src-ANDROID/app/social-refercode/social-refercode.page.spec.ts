import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialRefercodePage } from './social-refercode.page';

describe('SocialRefercodePage', () => {
  let component: SocialRefercodePage;
  let fixture: ComponentFixture<SocialRefercodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SocialRefercodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

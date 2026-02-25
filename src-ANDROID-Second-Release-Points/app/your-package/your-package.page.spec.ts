import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourPackagePage } from './your-package.page';

describe('YourPackagePage', () => {
  let component: YourPackagePage;
  let fixture: ComponentFixture<YourPackagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(YourPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

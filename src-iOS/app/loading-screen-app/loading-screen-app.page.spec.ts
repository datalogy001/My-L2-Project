import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingScreenAppPage } from './loading-screen-app.page';

describe('LoadingScreenAppPage', () => {
  let component: LoadingScreenAppPage;
  let fixture: ComponentFixture<LoadingScreenAppPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoadingScreenAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

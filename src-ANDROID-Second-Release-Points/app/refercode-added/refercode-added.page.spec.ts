import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RefercodeAddedPage } from './refercode-added.page';

describe('RefercodeAddedPage', () => {
  let component: RefercodeAddedPage;
  let fixture: ComponentFixture<RefercodeAddedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RefercodeAddedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

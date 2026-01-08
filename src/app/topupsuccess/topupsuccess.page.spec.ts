import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopupsuccessPage } from './topupsuccess.page';

describe('TopupsuccessPage', () => {
  let component: TopupsuccessPage;
  let fixture: ComponentFixture<TopupsuccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TopupsuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

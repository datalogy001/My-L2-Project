import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NointernetPage } from './nointernet.page';

describe('NointernetPage', () => {
  let component: NointernetPage;
  let fixture: ComponentFixture<NointernetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NointernetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

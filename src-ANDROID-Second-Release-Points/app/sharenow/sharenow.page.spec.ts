import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharenowPage } from './sharenow.page';

describe('SharenowPage', () => {
  let component: SharenowPage;
  let fixture: ComponentFixture<SharenowPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SharenowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareEsimPage } from './share-esim.page';

describe('ShareEsimPage', () => {
  let component: ShareEsimPage;
  let fixture: ComponentFixture<ShareEsimPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShareEsimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

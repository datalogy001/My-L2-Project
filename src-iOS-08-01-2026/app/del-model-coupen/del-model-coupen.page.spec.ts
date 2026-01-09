import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DelModelCoupenPage } from './del-model-coupen.page';

describe('DelModelCoupenPage', () => {
  let component: DelModelCoupenPage;
  let fixture: ComponentFixture<DelModelCoupenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DelModelCoupenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

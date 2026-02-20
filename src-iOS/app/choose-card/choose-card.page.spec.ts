import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseCardPage } from './choose-card.page';

describe('ChooseCardPage', () => {
  let component: ChooseCardPage;
  let fixture: ComponentFixture<ChooseCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChooseCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

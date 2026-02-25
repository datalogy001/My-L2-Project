import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCardsPage } from './saved-cards.page';

describe('SavedCardsPage', () => {
  let component: SavedCardsPage;
  let fixture: ComponentFixture<SavedCardsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SavedCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

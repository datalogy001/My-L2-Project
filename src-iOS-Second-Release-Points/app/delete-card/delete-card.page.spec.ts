import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCardPage } from './delete-card.page';

describe('DeleteCardPage', () => {
  let component: DeleteCardPage;
  let fixture: ComponentFixture<DeleteCardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeleteCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

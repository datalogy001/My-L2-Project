import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatedSuccessfulPage } from './created-successful.page';

describe('CreatedSuccessfulPage', () => {
  let component: CreatedSuccessfulPage;
  let fixture: ComponentFixture<CreatedSuccessfulPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreatedSuccessfulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

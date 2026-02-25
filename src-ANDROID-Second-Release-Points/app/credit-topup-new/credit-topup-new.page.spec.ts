import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditTopupNewPage } from './credit-topup-new.page';

describe('CreditTopupNewPage', () => {
  let component: CreditTopupNewPage;
  let fixture: ComponentFixture<CreditTopupNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreditTopupNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

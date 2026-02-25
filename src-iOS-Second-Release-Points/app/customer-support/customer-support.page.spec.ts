import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerSupportPage } from './customer-support.page';

describe('CustomerSupportPage', () => {
  let component: CustomerSupportPage;
  let fixture: ComponentFixture<CustomerSupportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

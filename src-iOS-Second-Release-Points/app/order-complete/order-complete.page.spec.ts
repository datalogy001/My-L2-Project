import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderCompletePage } from './order-complete.page';

describe('OrderCompletePage', () => {
  let component: OrderCompletePage;
  let fixture: ComponentFixture<OrderCompletePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrderCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPrice } from './ticket-price';

describe('TicketPrice', () => {
  let component: TicketPrice;
  let fixture: ComponentFixture<TicketPrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketPrice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPrice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

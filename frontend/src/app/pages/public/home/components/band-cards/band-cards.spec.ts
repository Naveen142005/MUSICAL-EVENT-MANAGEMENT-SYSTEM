import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandCards } from './band-cards';

describe('BandCards', () => {
  let component: BandCards;
  let fixture: ComponentFixture<BandCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

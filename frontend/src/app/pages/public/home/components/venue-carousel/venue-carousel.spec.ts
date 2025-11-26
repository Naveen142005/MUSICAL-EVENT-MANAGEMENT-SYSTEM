import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueCarousel } from './venue-carousel';

describe('VenueCarousel', () => {
  let component: VenueCarousel;
  let fixture: ComponentFixture<VenueCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

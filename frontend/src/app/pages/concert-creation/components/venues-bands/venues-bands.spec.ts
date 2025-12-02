import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuesBands } from './venues-bands';

describe('VenuesBands', () => {
  let component: VenuesBands;
  let fixture: ComponentFixture<VenuesBands>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenuesBands]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenuesBands);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

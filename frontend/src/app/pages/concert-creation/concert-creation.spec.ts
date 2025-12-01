import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertCreation } from './concert-creation';

describe('ConcertCreation', () => {
  let component: ConcertCreation;
  let fixture: ComponentFixture<ConcertCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcertCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

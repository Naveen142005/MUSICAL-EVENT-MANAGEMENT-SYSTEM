import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateChecking } from './date-checking';

describe('DateChecking', () => {
  let component: DateChecking;
  let fixture: ComponentFixture<DateChecking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateChecking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateChecking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAvailbility } from './check-availbility';

describe('CheckAvailbility', () => {
  let component: CheckAvailbility;
  let fixture: ComponentFixture<CheckAvailbility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckAvailbility]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAvailbility);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

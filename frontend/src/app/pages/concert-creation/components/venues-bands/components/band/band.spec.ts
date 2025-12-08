import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Band } from './band';

describe('Band', () => {
  let component: Band;
  let fixture: ComponentFixture<Band>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Band]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Band);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

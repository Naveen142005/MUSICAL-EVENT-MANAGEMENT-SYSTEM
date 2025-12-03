import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationAddons } from './decoration-addons';

describe('DecorationAddons', () => {
  let component: DecorationAddons;
  let fixture: ComponentFixture<DecorationAddons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorationAddons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecorationAddons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

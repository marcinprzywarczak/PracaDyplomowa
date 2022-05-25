import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotRentComponent } from './plot-rent.component';

describe('PlotRentComponent', () => {
  let component: PlotRentComponent;
  let fixture: ComponentFixture<PlotRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

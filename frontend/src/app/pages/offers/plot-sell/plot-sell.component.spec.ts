import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotSellComponent } from './plot-sell.component';

describe('PlotSellComponent', () => {
  let component: PlotSellComponent;
  let fixture: ComponentFixture<PlotSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

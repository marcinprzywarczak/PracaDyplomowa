import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatSellComponent } from './flat-sell.component';

describe('FlatSellComponent', () => {
  let component: FlatSellComponent;
  let fixture: ComponentFixture<FlatSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlatSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

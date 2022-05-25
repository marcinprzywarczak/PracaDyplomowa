import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSellComponent } from './house-sell.component';

describe('HouseSellComponent', () => {
  let component: HouseSellComponent;
  let fixture: ComponentFixture<HouseSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseComponent } from './house.component';

describe('HouseSellComponent', () => {
  let component: HouseComponent;
  let fixture: ComponentFixture<HouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HouseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseRentComponent } from './warehouse-rent.component';

describe('WarehouseRentComponent', () => {
  let component: WarehouseRentComponent;
  let fixture: ComponentFixture<WarehouseRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

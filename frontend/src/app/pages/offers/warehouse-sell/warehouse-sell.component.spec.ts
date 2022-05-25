import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseSellComponent } from './warehouse-sell.component';

describe('WarehouseSellComponent', () => {
  let component: WarehouseSellComponent;
  let fixture: ComponentFixture<WarehouseSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSellComponent } from './office-sell.component';

describe('OfficeSellComponent', () => {
  let component: OfficeSellComponent;
  let fixture: ComponentFixture<OfficeSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

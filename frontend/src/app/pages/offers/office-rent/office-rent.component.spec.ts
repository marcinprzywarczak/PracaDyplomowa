import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeRentComponent } from './office-rent.component';

describe('OfficeRentComponent', () => {
  let component: OfficeRentComponent;
  let fixture: ComponentFixture<OfficeRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

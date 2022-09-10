import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseOfferComponent } from './add-house-offer.component';

describe('AddHouseOfferComponent', () => {
  let component: AddHouseOfferComponent;
  let fixture: ComponentFixture<AddHouseOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHouseOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHouseOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

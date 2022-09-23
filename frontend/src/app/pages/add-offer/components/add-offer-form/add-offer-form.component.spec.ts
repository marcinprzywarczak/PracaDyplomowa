import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfferFormComponent } from './add-offer-form.component';

describe('AddHouseOfferComponent', () => {
  let component: AddOfferFormComponent;
  let fixture: ComponentFixture<AddOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOfferFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

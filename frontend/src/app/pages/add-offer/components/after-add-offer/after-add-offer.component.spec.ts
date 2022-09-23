import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterAddOfferComponent } from './after-add-offer.component';

describe('AfterAddOfferComponent', () => {
  let component: AfterAddOfferComponent;
  let fixture: ComponentFixture<AfterAddOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterAddOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterAddOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

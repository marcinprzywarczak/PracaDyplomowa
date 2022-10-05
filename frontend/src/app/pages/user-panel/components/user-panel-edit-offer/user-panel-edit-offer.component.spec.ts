import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelEditOfferComponent } from './user-panel-edit-offer.component';

describe('UserPanelEditOfferComponent', () => {
  let component: UserPanelEditOfferComponent;
  let fixture: ComponentFixture<UserPanelEditOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelEditOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelEditOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

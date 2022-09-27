import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelOffersComponent } from './user-panel-offers.component';

describe('UserPanelOffersComponent', () => {
  let component: UserPanelOffersComponent;
  let fixture: ComponentFixture<UserPanelOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

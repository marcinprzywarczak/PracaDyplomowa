import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelFollowingOffersComponent } from './user-panel-following-offers.component';

describe('UserPanelFollowingOffersComponent', () => {
  let component: UserPanelFollowingOffersComponent;
  let fixture: ComponentFixture<UserPanelFollowingOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelFollowingOffersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelFollowingOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

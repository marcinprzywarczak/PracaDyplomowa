import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelFirmUsersComponent } from './user-panel-firm-users.component';

describe('UserPanelFirmUsersComponent', () => {
  let component: UserPanelFirmUsersComponent;
  let fixture: ComponentFixture<UserPanelFirmUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelFirmUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelFirmUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

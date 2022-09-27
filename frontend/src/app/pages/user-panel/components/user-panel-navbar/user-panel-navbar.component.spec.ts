import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelNavbarComponent } from './user-panel-navbar.component';

describe('UserPanelNavbarComponent', () => {
  let component: UserPanelNavbarComponent;
  let fixture: ComponentFixture<UserPanelNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

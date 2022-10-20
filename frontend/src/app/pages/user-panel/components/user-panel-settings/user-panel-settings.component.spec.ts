import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelSettingsComponent } from './user-panel-settings.component';

describe('UserPanelSettingsComponent', () => {
  let component: UserPanelSettingsComponent;
  let fixture: ComponentFixture<UserPanelSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

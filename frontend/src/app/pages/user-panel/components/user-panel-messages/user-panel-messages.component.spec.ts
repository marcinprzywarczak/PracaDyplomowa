import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelMessagesComponent } from './user-panel-messages.component';

describe('UserPanelMessagesComponent', () => {
  let component: UserPanelMessagesComponent;
  let fixture: ComponentFixture<UserPanelMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

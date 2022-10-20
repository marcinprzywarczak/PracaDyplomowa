import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangePasswordFormComponent } from './user-change-password-form.component';

describe('UserChangePasswordFormComponent', () => {
  let component: UserChangePasswordFormComponent;
  let fixture: ComponentFixture<UserChangePasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChangePasswordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

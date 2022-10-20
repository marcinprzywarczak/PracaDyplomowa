import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmUserFormComponent } from './firm-user-form.component';

describe('FirmUserFormComponent', () => {
  let component: FirmUserFormComponent;
  let fixture: ComponentFixture<FirmUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

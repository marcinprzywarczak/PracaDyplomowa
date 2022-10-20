import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmEditFormComponent } from './firm-edit-form.component';

describe('FirmEditFormComponent', () => {
  let component: FirmEditFormComponent;
  let fixture: ComponentFixture<FirmEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

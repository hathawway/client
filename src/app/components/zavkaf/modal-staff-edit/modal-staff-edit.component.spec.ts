import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStaffEditComponent } from './modal-staff-edit.component';

describe('ModalStaffEditComponent', () => {
  let component: ModalStaffEditComponent;
  let fixture: ComponentFixture<ModalStaffEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStaffEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStaffEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

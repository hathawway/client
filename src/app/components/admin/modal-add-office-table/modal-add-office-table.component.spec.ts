import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddOfficeTableComponent } from './modal-add-office-table.component';

describe('ModalAddOfficeTableComponent', () => {
  let component: ModalAddOfficeTableComponent;
  let fixture: ComponentFixture<ModalAddOfficeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddOfficeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddOfficeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddActivityTableComponent } from './modal-add-activity-table.component';

describe('ModalAddActivityTableComponent', () => {
  let component: ModalAddActivityTableComponent;
  let fixture: ComponentFixture<ModalAddActivityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddActivityTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

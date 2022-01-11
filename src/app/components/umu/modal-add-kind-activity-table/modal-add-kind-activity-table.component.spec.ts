import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddKindActivityTableComponent } from './modal-add-kind-activity-table.component';

describe('ModalAddKindActivityTableComponent', () => {
  let component: ModalAddKindActivityTableComponent;
  let fixture: ComponentFixture<ModalAddKindActivityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddKindActivityTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddKindActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

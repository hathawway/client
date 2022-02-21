import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddStavkaSharedComponent } from './modal-add-stavka-shared.component';

describe('ModalAddStavkaSharedComponent', () => {
  let component: ModalAddStavkaSharedComponent;
  let fixture: ComponentFixture<ModalAddStavkaSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddStavkaSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddStavkaSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

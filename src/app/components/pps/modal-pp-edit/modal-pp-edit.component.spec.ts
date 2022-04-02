import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPpEditComponent } from './modal-pp-edit.component';

describe('ModalPpEditComponent', () => {
  let component: ModalPpEditComponent;
  let fixture: ComponentFixture<ModalPpEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPpEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

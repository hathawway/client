import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditStavkaComponent } from './modal-edit-stavka.component';

describe('ModalEditStavkaComponent', () => {
  let component: ModalEditStavkaComponent;
  let fixture: ComponentFixture<ModalEditStavkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditStavkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditStavkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

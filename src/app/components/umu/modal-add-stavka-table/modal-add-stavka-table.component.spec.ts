import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddStavkaTableComponent } from './modal-add-stavka-table.component';

describe('ModalAddStavkaTableComponent', () => {
  let component: ModalAddStavkaTableComponent;
  let fixture: ComponentFixture<ModalAddStavkaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddStavkaTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddStavkaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

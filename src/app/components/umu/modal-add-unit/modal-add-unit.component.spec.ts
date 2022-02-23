import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddUnitComponent } from './modal-add-unit.component';

describe('ModalAddUnitComponent', () => {
  let component: ModalAddUnitComponent;
  let fixture: ComponentFixture<ModalAddUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

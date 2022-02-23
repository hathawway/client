import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddNormaKindActivityComponent } from './modal-add-norma-kind-activity.component';

describe('ModalAddNormaKindActivityComponent', () => {
  let component: ModalAddNormaKindActivityComponent;
  let fixture: ComponentFixture<ModalAddNormaKindActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddNormaKindActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddNormaKindActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

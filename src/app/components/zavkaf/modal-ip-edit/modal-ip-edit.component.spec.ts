import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIpEditComponent } from './modal-ip-edit.component';

describe('ModalIpEditComponent', () => {
  let component: ModalIpEditComponent;
  let fixture: ComponentFixture<ModalIpEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalIpEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

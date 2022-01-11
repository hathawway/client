import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddPostTableComponent } from './modal-add-post-table.component';

describe('ModalAddPostTableComponent', () => {
  let component: ModalAddPostTableComponent;
  let fixture: ComponentFixture<ModalAddPostTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddPostTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddPostTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

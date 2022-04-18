import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPpComponent } from './edit-pp.component';

describe('EditPpComponent', () => {
  let component: EditPpComponent;
  let fixture: ComponentFixture<EditPpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

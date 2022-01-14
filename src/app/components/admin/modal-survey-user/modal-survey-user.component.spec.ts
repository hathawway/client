import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSurveyUserComponent } from './modal-survey-user.component';

describe('ModalSurveyUserComponent', () => {
  let component: ModalSurveyUserComponent;
  let fixture: ComponentFixture<ModalSurveyUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSurveyUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSurveyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

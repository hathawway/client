import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSurveyScheduleComponent } from './modal-survey-schedule.component';

describe('ModalSurveyScheduleComponent', () => {
  let component: ModalSurveyScheduleComponent;
  let fixture: ComponentFixture<ModalSurveyScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSurveyScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSurveyScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSurveyActivityTableComponent } from './modal-survey-activity-table.component';

describe('ModalSurveyActivityTableComponent', () => {
  let component: ModalSurveyActivityTableComponent;
  let fixture: ComponentFixture<ModalSurveyActivityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSurveyActivityTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSurveyActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

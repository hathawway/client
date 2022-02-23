import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormaKindActivityComponent } from './norma-kind-activity.component';

describe('NormaKindActivityComponent', () => {
  let component: NormaKindActivityComponent;
  let fixture: ComponentFixture<NormaKindActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormaKindActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormaKindActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

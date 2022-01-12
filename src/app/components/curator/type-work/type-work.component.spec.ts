import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeWorkComponent } from './type-work.component';

describe('TypeWorkComponent', () => {
  let component: TypeWorkComponent;
  let fixture: ComponentFixture<TypeWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

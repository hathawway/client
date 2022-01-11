import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindActivityTableComponent } from './kind-activity-table.component';

describe('KindActivityTableComponent', () => {
  let component: KindActivityTableComponent;
  let fixture: ComponentFixture<KindActivityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindActivityTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

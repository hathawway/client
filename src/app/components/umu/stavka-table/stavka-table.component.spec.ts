import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StavkaTableComponent } from './stavka-table.component';

describe('StavkaTableComponent', () => {
  let component: StavkaTableComponent;
  let fixture: ComponentFixture<StavkaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StavkaTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StavkaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

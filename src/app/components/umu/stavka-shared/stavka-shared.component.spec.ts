import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StavkaSharedComponent } from './stavka-shared.component';

describe('StavkaSharedComponent', () => {
  let component: StavkaSharedComponent;
  let fixture: ComponentFixture<StavkaSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StavkaSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StavkaSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaketComponent } from './maket.component';

describe('MaketComponent', () => {
  let component: MaketComponent;
  let fixture: ComponentFixture<MaketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

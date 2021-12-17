import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverStandingsComponent } from './driver-standings.component';

describe('DriverStandingsComponent', () => {
  let component: DriverStandingsComponent;
  let fixture: ComponentFixture<DriverStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverStandingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

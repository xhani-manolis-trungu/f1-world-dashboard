import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundDriverStandingsComponent } from './round-driver-standings.component';

describe('RoundDriverStandingsComponent', () => {
  let component: RoundDriverStandingsComponent;
  let fixture: ComponentFixture<RoundDriverStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundDriverStandingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundDriverStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

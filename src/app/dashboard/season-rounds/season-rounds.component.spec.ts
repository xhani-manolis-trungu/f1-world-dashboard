import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonRoundsComponent } from './season-rounds.component';

describe('SeasonRoundsComponent', () => {
  let component: SeasonRoundsComponent;
  let fixture: ComponentFixture<SeasonRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonRoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

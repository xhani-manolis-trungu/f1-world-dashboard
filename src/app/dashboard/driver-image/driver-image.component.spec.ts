import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverImageComponent } from './driver-image.component';

describe('DriverImageComponent', () => {
  let component: DriverImageComponent;
  let fixture: ComponentFixture<DriverImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

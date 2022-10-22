import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Driver } from 'src/app/domain/driver';
import { DriverInfoState } from './driver-info-state/driver-info.state';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.css']
})
export class DriverInfoComponent implements OnInit {
  @Select(DriverInfoState.driverInfo) driverInfo$!: Observable<Driver[]>;

  constructor() { }

  ngOnInit(): void {
  }

}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'src/app/@core/decorators';
import { Driver } from 'src/app/domain/driver';
import { DriverInfoState } from '../driver-info/driver-info-state/driver-info.state';
import { DriverImageState } from './driver-image-state/driver-image.state';

@Component({
  selector: 'app-driver-image',
  templateUrl: './driver-image.component.html',
  styleUrls: ['./driver-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverImageComponent implements OnInit {
  public url: string = '';
  @Select(DriverImageState.driverImageUrl) driverImageUrl$!: Observable<string[]>;
  @Select(DriverInfoState.driverInfo) driverInfo$!: Observable<Driver[]>;

  constructor() { }

  ngOnInit(): void {
  }
}

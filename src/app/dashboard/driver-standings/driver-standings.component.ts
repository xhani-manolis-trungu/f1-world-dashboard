import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'src/app/@core/decorators';
import { DriverService } from 'src/app/services/driver.service';
import { DriverStanding } from '../../domain/driver-standing';
import { TableColumn } from '../../shared/general-table/interfaces';
import { GetDriverInfo } from '../driver-info/driver-info-state/driver-info.actions';
import { DriverStandingsState } from './driver-standings-state/driver-standings.state';

@Component({
  selector: 'app-driver-standings',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['./driver-standings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverStandingsComponent implements OnInit {
  @Select(DriverStandingsState.driverStandings) driverStandings$!: Observable<DriverStanding[] | null>;
  season$!: Observable<string>;
  standingsColumns!: TableColumn[];

  constructor(
    private driverService: DriverService,
    private store: Store) {
    this.standingsColumns = [
      { columnDef: 'pos', header: 'Position', cell: (element: DriverStanding) => `${element.position}` },
      { columnDef: 'driver', header: 'Driver', cell: (element: DriverStanding) => `${element.Driver.familyName}` },
      { columnDef: 'constructor', header: 'Constructor', cell: (element: DriverStanding) => `${element.Constructors[0].name}` },
      { columnDef: 'points', header: 'Points', cell: (element: DriverStanding) => `${element.points}` },
      { columnDef: 'wins', header: 'Wins', cell: (element: DriverStanding) => `${element.wins}` },
    ];
  }

  ngOnInit(): void {}

  @AutoUnsubscribe()
  getDriverBio(row: DriverStanding) {
    this.driverService.setDriver(row.Driver.familyName);
    return this.driverService.loadDriversBio()
    .subscribe(
      (driverBio) => this.store.dispatch(new GetDriverInfo(driverBio)),
      (err) => console.log(err)
    )
  }

}

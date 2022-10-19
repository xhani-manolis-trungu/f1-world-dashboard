import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoUnsubscribe } from 'src/app/@core/decorators';
import { Driver } from 'src/app/domain/driver';
import { DriverService } from 'src/app/services/driver.service';
import { DriverStanding } from '../../domain/driver-standing';
import { TableColumn } from '../../shared/general-table/interfaces';
import { RoundsState } from '../season-rounds/season-rounds-state/season-rounds.state';

@Component({
  selector: 'app-driver-standings',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['./driver-standings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverStandingsComponent implements OnInit {
  @Select(RoundsState.driverStandings) driverStandings$!: Observable<DriverStanding[] | null>;
  season$!: Observable<string>;
  standingsColumns!: TableColumn[];

  constructor(private driverService: DriverService) {
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
      (driverBio) => {console.log(driverBio) },
      (err) => console.log(err)
    )
  }

}

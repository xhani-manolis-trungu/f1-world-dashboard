import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AutoUnsubscribe } from 'src/app/@core/decorators';
import { DriverService } from 'src/app/services/driver.service';
import { SeasonsService } from 'src/app/services/seasons.service';
import { urlSplitter } from 'src/app/utils/urlSplitter';
import { DriverStanding } from '../../domain/driver-standing';
import { TableColumn } from '../../shared/general-table/interfaces';
import { SetDriverName } from '../driver-image/driver-image-state/driver-image.actions';
import { GetDriverInfo } from '../driver-info/driver-info-state/driver-info.actions';
import { GetDriverStandings, GetSeasonDriverStandings } from './driver-standings-state/driver-standings.actions';
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
    private seasonService: SeasonsService,
    private driverService: DriverService,
    private store: Store) {
    this.standingsColumns = [
      { columnDef: 'pos', header: 'Position', cell: (element: DriverStanding) => `${element.position}` },
      { columnDef: 'driver', header: 'Driver', cell: (element: DriverStanding) => `${element.Driver.familyName}` },
      { columnDef: 'points', header: 'Points', cell: (element: DriverStanding) => `${element.points}` },
    ];
  }

  ngOnInit() {
    AutoUnsubscribe()
    return this.seasonService.getSeason().pipe(
      map(season => season),
      mergeMap((season) => {
        return this.store.dispatch(new GetSeasonDriverStandings(season))
      }),
      catchError((err) => err)
    ).subscribe(() => { }, (err) => console.log(err))
  }

  @AutoUnsubscribe()
  getDriverBio(row: DriverStanding) {
    this.driverService.setDriver(row.Driver.familyName);
    return this.driverService.loadDriversBio()
    .subscribe(
      (driverBio) => {
        this.store.dispatch(new GetDriverInfo(driverBio))

      },
      (err) => console.log(err)
    )
  }

}

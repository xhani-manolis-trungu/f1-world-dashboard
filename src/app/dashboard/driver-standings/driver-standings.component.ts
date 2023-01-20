import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { AutoUnsubscribe } from 'src/app/@core/decorators';
import { DriverService } from 'src/app/services/driver.service';
import { SeasonsService } from 'src/app/services/seasons.service';
import { UrlSplitter } from 'src/app/utils/urlSplitter';
import { DriverStanding } from '../../domain/driver-standing';
import { TableColumn } from '../../shared/general-table/interfaces';
import { GetDriverInfo } from '../driver-info/driver-info-state/driver-info.actions';
import { GetSeasonDriverStandings } from './driver-standings-state/driver-standings.actions';
import { DriverStandingsState } from './driver-standings-state/driver-standings.state';

@Component({
  selector: 'app-driver-standings',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['./driver-standings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverStandingsComponent implements OnInit {
  @Input() season!: string;

  @Select(DriverStandingsState.driverStandings) driverStandings$!: Observable<DriverStanding[]>;
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
      take(1),
      map(season => season),
      mergeMap((season) => {
        return this.store.dispatch(new GetSeasonDriverStandings(season))
      }),
      catchError((err) => err)
    ).subscribe(() => { }, (err) => console.log(err))
  }

  @AutoUnsubscribe()
  getDriverBio(row: DriverStanding) {

    const driverName = this.getDriverName(row);
    this.driverService.setDriver(driverName);

    return this.driverService.loadDriversBio(driverName)
      .subscribe(
        (driverBio) => {
          this.store.dispatch(new GetDriverInfo(driverBio))

        },
        (err) => console.log(err)
      )
  }

  getDriverName(row: DriverStanding): string {
    const driverName = new UrlSplitter()
      .setDriverName(row.Driver.familyName)
      .addNameForDriversWithSameLastname(row.Driver.givenName)
      .normalizeNameSpaces()
      .driverName;

    return driverName;
  }

}

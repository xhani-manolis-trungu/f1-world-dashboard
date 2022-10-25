import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, mergeMap, catchError, take } from 'rxjs/operators';
import { AutoUnsubscribe } from 'src/app/@core/decorators';
import { DriverStanding } from 'src/app/domain/driver-standing';
import { DriverService } from 'src/app/services/driver.service';
import { SeasonsService } from 'src/app/services/seasons.service';
import { TableColumn } from 'src/app/shared/general-table/interfaces';
import { UrlSplitter } from 'src/app/utils/urlSplitter';
import { GetDriverInfo } from '../driver-info/driver-info-state/driver-info.actions';
import { DriverStandingsState } from '../driver-standings/driver-standings-state/driver-standings.state';
import { GetSeasonDriverStandings } from './round-driver-standings-state/round-driver-standings.actions';
import { RoundDriverStandingsState } from './round-driver-standings-state/round-driver-standings.state';

@Component({
  selector: 'app-round-driver-standings',
  templateUrl: './round-driver-standings.component.html',
  styleUrls: ['./round-driver-standings.component.css']
})
export class RoundDriverStandingsComponent implements OnInit {
  @Select(RoundDriverStandingsState.roundDriverStandings) roundDriverStandings$!: Observable<DriverStanding[] | null>;
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

    const driverName = new UrlSplitter()
      .setDriverName(row.Driver.familyName)
      .addNameForDriversWithSameLastname(row.Driver.givenName)
      .normalizeNameSpaces()
      .driverName;

    this.driverService.setDriver(driverName);
    return this.driverService.loadDriversBio().pipe(take(1))
    .subscribe(
      (driverBio) => {
        this.store.dispatch(new GetDriverInfo(driverBio))

      },
      (err) => console.log(err)
    )
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, forkJoin, merge, Observable, of, Subscription } from 'rxjs';
import { elementAt } from 'rxjs-compat/operator/elementAt';
import { combineAll, mergeMap, scan, switchMap, tap } from 'rxjs/operators';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { DriverStanding } from '../domain/driver-standing';
import { Race } from '../domain/race';
import { Season } from '../domain/season';
import { StandingsLists, StandingsTable } from '../domain/tables/standings-table';
import { RoundsService } from '../services/rounds.service';
import { SeasonsService } from '../services/seasons.service';
import { TableColumn } from '../shared/general-table/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  season$!: Observable<string>;
  seasonSubscription!: Subscription;
  season!: string;

  rounds$!: Observable<Race[]>
  standingsTable$!: Observable<DriverStanding[]>;

  data: any[] = [];
  roundsColumns!: TableColumn[];
  standingsColumns!: TableColumn[];

  constructor(
    private seasonService: SeasonsService,
    private roundsService: RoundsService
  ) {
    this.roundsColumns = [
      { columnDef: 'round', header: 'Round', cell: (element: Race) => `${element.round}` },
      { columnDef: 'circuit', header: 'Circuit', cell: (element: Race) => `${element.Circuit.circuitName}` },
      { columnDef: 'country', header: 'Country', cell: (element: Race) => `${element.Circuit.Location.country}` }
    ];

    this.standingsColumns = [
      { columnDef: 'pos', header: 'Position', cell: (element: DriverStanding) => `${element.position}` },
      { columnDef: 'driver', header: 'Driver', cell: (element: DriverStanding) => `${element.Driver.familyName}` },
      { columnDef: 'constructor', header: 'Constructor', cell: (element: DriverStanding) => `${element.Constructors[0].name}` },
      { columnDef: 'points', header: 'Points', cell: (element: DriverStanding) => `${element.points}` },
      { columnDef: 'wins', header: 'Wins', cell: (element: DriverStanding) => `${element.wins}` },
    ];
  }

  ngOnInit() {
    this.season$ = this.seasonService.getSeason().pipe(distinctUntilChanged());

    this.rounds$ = this.roundsService.rounds
  }

  ngOnDestroy() {
    this.seasonSubscription?.unsubscribe();
  }

  getDriverStandings(row: Round) {
    this.seasonSubscription = this.seasonService.getSeason().subscribe(season => this.season = season);

    this.standingsTable$ = this.roundsService.loadStandingsTable(this.season, row.round)
      .pipe(
        map((standingsTable: StandingsTable) => {
          return standingsTable.StandingsLists[0].DriverStandings
        })
      )
  }
}

export type Round = Pick<Race, 'round'>;

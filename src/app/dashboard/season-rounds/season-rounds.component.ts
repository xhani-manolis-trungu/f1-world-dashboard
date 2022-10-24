import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { AutoUnsubscribe } from 'src/app/@core/decorators';
import { StandingsTable } from 'src/app/domain/tables/standings-table';
import { Race } from '../../domain/race';
import { RoundsService } from '../../services/rounds.service';
import { SeasonsService } from '../../services/seasons.service';
import { TableColumn } from '../../shared/general-table/interfaces';
import { GetDriverStandings } from '../driver-standings/driver-standings-state/driver-standings.actions';
import { GetRounds } from './season-rounds-state/season-rounds.actions';
import { RoundsState } from './season-rounds-state/season-rounds.state';

export type Round = Pick<Race, 'round'>;

@Component({
  selector: 'app-season-rounds',
  templateUrl: './season-rounds.component.html',
  styleUrls: ['./season-rounds.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonRoundsComponent implements OnInit {
  @Select(RoundsState.getRoundsList) rounds$!: Observable<Race[]>;
  season$!: Observable<string>;
  season!: string;
  seasonSubscription!: Subscription;

  roundsColumns!: TableColumn[];
  standingsTable$!: Observable<StandingsTable>;

  constructor(
    private seasonService: SeasonsService,
    private store: Store) {
    this.roundsColumns = [
      { columnDef: 'round', header: 'Round', cell: (element: Race) => `${element.round}` },
      { columnDef: 'circuit', header: 'Circuit', cell: (element: Race) => `${element.Circuit.circuitName}` },
      { columnDef: 'country', header: 'Country', cell: (element: Race) => `${element.Circuit.Location.country}` }
    ];
  }

  ngOnInit(): void {
    this.store.dispatch(new GetRounds())

    AutoUnsubscribe()
    this.season$ = this.seasonService.getSeason().pipe(distinctUntilChanged());
  }

  @AutoUnsubscribe()
  getDriverStandings(row: Round) {
    return this.seasonService.getSeason().pipe(
      map(season => season),
      mergeMap((season) => {
        return this.store.dispatch(new GetDriverStandings(season, row.round))
      }),
      catchError((err) => err)
    ).subscribe(() => { }, (err) => console.log(err))
  }

}

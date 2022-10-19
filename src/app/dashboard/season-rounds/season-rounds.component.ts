import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, map, mergeMap } from 'rxjs/operators';
import { AutoUnsubscribe } from 'src/app/@core/decorators';
import { StandingsTable } from 'src/app/domain/tables/standings-table';
import { Race } from '../../domain/race';
import { RoundsService } from '../../services/rounds.service';
import { SeasonsService } from '../../services/seasons.service';
import { TableColumn } from '../../shared/general-table/interfaces';
import { GetDriverStandings } from './season-rounds-state/season-rounds.actions';

export type Round = Pick<Race, 'round'>;

@Component({
  selector: 'app-season-rounds',
  templateUrl: './season-rounds.component.html',
  styleUrls: ['./season-rounds.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonRoundsComponent implements OnInit {
  season$!: Observable<string>;
  season!: string;
  seasonSubscription!: Subscription;

  rounds$!: Observable<Race[]>
  roundsColumns!: TableColumn[];
  standingsTable$!: Observable<StandingsTable>;

  constructor(
    private roundsService: RoundsService,
    private seasonService: SeasonsService,
    private store: Store) {
    this.roundsColumns = [
      { columnDef: 'round', header: 'Round', cell: (element: Race) => `${element.round}` },
      { columnDef: 'circuit', header: 'Circuit', cell: (element: Race) => `${element.Circuit.circuitName}` },
      { columnDef: 'country', header: 'Country', cell: (element: Race) => `${element.Circuit.Location.country}` }
    ];
  }

  ngOnInit(): void {
    AutoUnsubscribe()
    this.season$ = this.seasonService.getSeason().pipe(distinctUntilChanged());
    this.rounds$ = this.roundsService.rounds
  }

  @AutoUnsubscribe()
  getDriverStandings(row: Round) {
    return this.seasonService.getSeason().pipe(
      map(season => season),
      mergeMap((season) => {
        console.log(season)
        return this.store.dispatch(new GetDriverStandings(season, row.round))
      }),
      catchError((err) => err)
    ).subscribe(() => { }, (err) => console.log(err))
  }

}

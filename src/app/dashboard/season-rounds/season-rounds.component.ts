import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { DriverStanding } from '../../domain/driver-standing';
import { Race } from '../../domain/race';
import { StandingsTable } from '../../domain/tables/standings-table';
import { RoundsService } from '../../services/rounds.service';
import { SeasonsService } from '../../services/seasons.service';
import { TableColumn } from '../../shared/general-table/interfaces';

export type Round = Pick<Race, 'round'>;

@Component({
  selector: 'app-season-rounds',
  templateUrl: './season-rounds.component.html',
  styleUrls: ['./season-rounds.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeasonRoundsComponent implements OnInit, OnDestroy {
  season$!: Observable<string>;
  season!: string;
  seasonSubscription!: Subscription;

  rounds$!: Observable<Race[]>
  roundsColumns!: TableColumn[];
  standingsTable$!: Observable<DriverStanding[]>;

  constructor(private roundsService: RoundsService, private seasonService: SeasonsService) {
    this.roundsColumns = [
      { columnDef: 'round', header: 'Round', cell: (element: Race) => `${element.round}` },
      { columnDef: 'circuit', header: 'Circuit', cell: (element: Race) => `${element.Circuit.circuitName}` },
      { columnDef: 'country', header: 'Country', cell: (element: Race) => `${element.Circuit.Location.country}` }
    ];
  }

  ngOnInit(): void {
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, forkJoin, merge, Observable, of, Subscription } from 'rxjs';
import { combineAll, mergeMap, scan, switchMap, tap } from 'rxjs/operators';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Race } from '../domain/race';
import { Season } from '../domain/season';
import { RoundsService } from '../services/rounds.service';
import { SeasonsService } from '../services/seasons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  season$!: Observable<string>;
  season!: string;

  rounds$!: Observable<Race[]>

  allData$!: Observable<any[]>

  constructor(
    private seasonService: SeasonsService,
    private roundsService: RoundsService
  ) { }

  ngOnInit() {
    this.season$ = this.seasonService.getSeason().pipe(distinctUntilChanged());

    this.rounds$ = this.roundsService.rounds

    this.allData$ = merge<Race[], Season[]>(
      this.rounds$,
      this.seasonService.seasons
        .pipe(map(seasons => seasons))
    ).pipe(
      scan((result, incoming) => {
        return <Race[] & Season[]><unknown>[
          { rounds: incoming },
          { seasons: result }
        ]
      }),
      tap(r => console.log(r))
    )
  }
}

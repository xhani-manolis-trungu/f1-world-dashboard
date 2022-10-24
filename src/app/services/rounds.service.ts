import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map, mergeMap, shareReplay } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Configuration } from "../app.constants";
import { ErgastResponse } from "../domain/ergast/ergast-response";
import { Race } from "../domain/race";
import { StandingsTable } from "../domain/tables/standings-table";
import { SeasonsService } from "./seasons.service";

@Injectable({
  providedIn: 'root',
})
export class RoundsService implements OnDestroy {

  private roundsCache$!: Observable<Race[]>;
  private roundsResultsCache$!: Observable<Race[]>;
  private standingsTableCache$!: Observable<StandingsTable>;

  private round = new BehaviorSubject<string | number>(1);

  private season$!: Observable<string | number>;

  constructor(
    private http: HttpClient,
    private config: Configuration,
    private seasonsService: SeasonsService) {
    this.season$ = this.seasonsService.getSeason()
      .pipe(distinctUntilChanged())
  }

  ngOnDestroy() {}

  setRound(race: string | number): void {
    this.round.next(race);
    this.config.round = race;
  }

  getRound(): Observable<string | number> {
    return this.round.asObservable();
  }

  get rounds(): Observable<Race[]> {
    if (!this.roundsCache$) {
      this.roundsCache$ = this.season$
        .pipe(
          distinctUntilChanged(),
          debounceTime(400),
          mergeMap(season => {
            return this.loadRounds(season);
          }),
          shareReplay(1)
        )
    }

    return this.roundsCache$;
  }

  loadStandingsTable(season: string | number, round?: string | number): Observable<StandingsTable> {
    const url = !!round ? `${environment.apiUrl}${season}/${round}/driverStandings.json?limit=${environment.apiMaxPageLimit}` : `${environment.apiUrl}${season}/driverStandings.json?limit=${environment.apiMaxPageLimit}`;
    return this.http.get<ErgastResponse>(url).pipe(
      map(result => {
        const standingsTable: StandingsTable = result.MRData.StandingsTable
        return standingsTable
      }),
      shareReplay(1)
    )
  }

  private loadRounds(season: string | number): Observable<Race[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.apiUrl}${season}.json?limit=${environment.apiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          const races: Race[] = result.MRData.RaceTable.Races;
          return races;
        }),
        shareReplay(1)
      );
  }

  roundsResults(round: string | number): Observable<Race[]> {
    if (!this.roundsResultsCache$) {
      this.roundsResultsCache$ = this.season$
        .pipe(
          distinctUntilChanged(),
          debounceTime(400),
          mergeMap(season => {
            return this.loadRoundsResults(season, round);
          }),
          shareReplay(1)
        )
    }

    return this.roundsCache$;
  }

  loadRoundsResults(season: string | number, round: string | number) {
    return this.http.get<ErgastResponse>(
      `${environment.apiUrl}${season}/${round}/results.json?limit=${environment.apiMaxPageLimit
      }`,
    )
      .pipe(
        map(result => result.MRData.RaceTable.Races),
        shareReplay(1)
      )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs';
import { Season } from '../domain/season';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Configuration } from '../app.constants';
import { ErgastResponse } from '../domain/ergast/ergast-response';

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
  private seasonsCache$!: Observable<Season[]>;

  private season = new BehaviorSubject<string>(this.getCurrentYear());

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  getCurrentYear(): string {
    return new Date().getFullYear().toString()
  }

  setSeason(newSeason: string): void {
    this.season.next(newSeason);
    this.config.season = newSeason;
  }

  getSeason(): Observable<string> {
    return this.season.asObservable();
  }

  get seasons(): Observable<Season[]> {
    if (!this.seasonsCache$) {
      this.seasonsCache$ = this.loadSeasons();
    }

    return this.seasonsCache$;
  }


  private loadSeasons(): Observable<Season[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.apiUrl}seasons.json?limit=${environment.apiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          const seasons: Season[] = result.MRData.SeasonTable.Seasons;
          return seasons;
        }),
        shareReplay(1)
      );
  }
}

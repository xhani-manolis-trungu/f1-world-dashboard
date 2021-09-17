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

  private season = new BehaviorSubject<string>('current');

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  setSeason(newSeason: string) {
    this.season.next(newSeason);
    this.config.season = newSeason;
  }

  getSeason(): Observable<string> {
    return this.season.asObservable();
  }

  get seasons() {
    if (!this.seasonsCache$) {
      this.seasonsCache$ = this.loadSeasons();
    }

    return this.seasonsCache$;
  }


  private loadSeasons(): Observable<Season[]> {
    console.log(`GET seasons`)
    return this.http
      .get<ErgastResponse>(
        `${environment.apiUrl}seasons.json?limit=${environment.apiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          const tmp: Season[] = result.MRData.SeasonTable.Seasons;
          const currentSeason = new Season();
          currentSeason.season = 'current';
          currentSeason.url = '';
          tmp.push(currentSeason);
          return tmp;
        }),
        shareReplay()
      );
  }
}

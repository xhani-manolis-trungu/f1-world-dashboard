import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BehaviorSubject } from 'rxjs';
import { Season } from '../domain/season';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Configuration } from '../app.constants';
import { ErgastResponse } from '../domain/ergast/ergast-response';
import { Driver } from '../domain/driver';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private driverCache$!: Observable<Driver[]>;

  private driver = new BehaviorSubject<string>('');//Driver name */

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  setDriver(newDriver: string): void {
    this.driver.next(newDriver);
    this.config.driver = newDriver;
  }

  getDriver(): string {
    return this.driver.value;
  }

  get driversCache(): Observable<Driver[]> {
    if (!this.driverCache$) {
      this.driverCache$ = this.loadDriversBio();
    }

    return this.driverCache$;
  }

  loadDriversBio(familyName?: string): Observable<Driver[]> {
    return this.http
      .get<ErgastResponse>(
        `${environment.apiUrl}drivers/${familyName !== undefined ? familyName : this.getDriver()}.json?limit=${environment.apiMaxPageLimit
        }`,
      )
      .pipe(
        map(result => {
          const driversBio: Driver[] = result.MRData.DriverTable.Drivers;
          return driversBio;
        }),
        shareReplay(1)
      );
  }
}

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
import { DriverImage } from '../domain/driverImage';

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

  getDriverImage(driverName: string) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${driverName}&pithumbsize=500&format=json&formatversion=2&origin=*`

      return this.http.get(url).pipe(
        map((data: any) => {
          const imageUrl = data.query.pages[0]?.thumbnail.source;
          const imageHeight = data.query.pages[0]?.thumbnail.height;
          const imageWidth = data.query.pages[0]?.thumbnail.width;
          return {imageUrl, imageHeight, imageWidth} as DriverImage;
        }),
        shareReplay(1)
      )
  }
}

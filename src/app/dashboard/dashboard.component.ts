import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SeasonsService } from '../services/seasons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  season$!: Observable<string>;

  constructor(
    private http: HttpClient,
    private seansonService: SeasonsService
  ) { }

  is = true;

  ngOnInit() {
    this.season$ = this.seansonService.getSeason().pipe(take(1))
  }

  localError() {
    throw Error('The app component has thrown an error!');
  }

  failingRequest() {
    this.http.get('https://httpstat.us/404?sleep=2000').toPromise();
  }

  successfulRequest() {
    this.http.get('https://httpstat.us/200?sleep=2000').toPromise();
  }
}



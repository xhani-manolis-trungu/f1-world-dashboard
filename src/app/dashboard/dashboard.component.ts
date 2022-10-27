import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient) { }

  is = true;

  ngOnInit() { }

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



import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Season } from '../domain/season';
import { SeasonsService } from '../services/seasons.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  season$!: Observable<string>;

  constructor(private seasonService: SeasonsService) { }

  ngOnInit() {
    this.season$ = this.seasonService.getSeason().pipe(distinctUntilChanged());
  }
}

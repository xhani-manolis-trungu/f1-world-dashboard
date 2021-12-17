import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverStanding } from '../../domain/driver-standing';
import { TableColumn } from '../../shared/general-table/interfaces';

@Component({
  selector: 'app-driver-standings',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['./driver-standings.component.css']
})
export class DriverStandingsComponent implements OnInit {
  season$!: Observable<string>;
  standingsColumns!: TableColumn[];
  standingsTable$!: Observable<DriverStanding[]>;

  constructor() {
    this.standingsColumns = [
      { columnDef: 'pos', header: 'Position', cell: (element: DriverStanding) => `${element.position}` },
      { columnDef: 'driver', header: 'Driver', cell: (element: DriverStanding) => `${element.Driver.familyName}` },
      { columnDef: 'constructor', header: 'Constructor', cell: (element: DriverStanding) => `${element.Constructors[0].name}` },
      { columnDef: 'points', header: 'Points', cell: (element: DriverStanding) => `${element.points}` },
      { columnDef: 'wins', header: 'Wins', cell: (element: DriverStanding) => `${element.wins}` },
    ];
  }

  ngOnInit(): void {
  }

}

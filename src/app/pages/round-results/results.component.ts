import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Season } from 'src/app/domain/season';
import { SeasonsService } from 'src/app/services/seasons.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() season!: Observable<Season[]>;

  constructor(private seasonsService: SeasonsService) { }

  ngOnInit(): void {
  }

}

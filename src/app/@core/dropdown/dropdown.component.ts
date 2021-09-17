import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Season } from 'src/app/domain/season';
import { SeasonsService } from 'src/app/services/seasons.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  seasons$!: Observable<string[]>;
  selectedSeason: string = new Date().getFullYear().toString();

  constructor(private seasonsService: SeasonsService) { }

  ngOnInit(): void {
    this.seasonsService.setSeason(this.selectedSeason);

    this.seasons$ = this.seasonsService.seasons.pipe(map((res: Season[]) => res.map(item => item.season)));
  }

  getValues() {
    if (this.selectedSeason != null) { this.seasonsService.setSeason(this.selectedSeason); }
    return;
  }

}

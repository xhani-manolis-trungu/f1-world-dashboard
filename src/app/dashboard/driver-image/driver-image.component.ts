import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DriverImageState } from './driver-image-state/driver-image.state';

@Component({
  selector: 'app-driver-image',
  templateUrl: './driver-image.component.html',
  styleUrls: ['./driver-image.component.css']
})
export class DriverImageComponent implements OnInit {
  @Select(DriverImageState.driverImageUrl) driverImageUrl$!: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
  }

  // https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=Charles_Leclerc
  // To get the image of a driver you need to get the page id of the driver and then use that id to get the image url from the pageimages property
}

import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Configuration implements OnInit {
  public season!: string;
  public round!: string | number;
  public driver!: string;

  public githubUserName = 'manolis';

  ngOnInit() { }
}

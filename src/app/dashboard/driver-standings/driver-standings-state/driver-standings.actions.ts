export class GetDriverStandings {
  static readonly type = '[Driver Standings] Get Driver Standings';

  constructor(public season: number | string, public round: number | string) {}
}

export class GetSeasonDriverStandings {
  static readonly type = '[Season Driver Standings] Get Season Driver Standings';

  constructor(public season: number | string) {}
}

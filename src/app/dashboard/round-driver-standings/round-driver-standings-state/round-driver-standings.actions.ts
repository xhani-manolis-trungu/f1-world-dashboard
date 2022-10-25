export class GetRoundDriverStandings {
  static readonly type = '[Round Driver Standings] Get Round Driver Standings';

  constructor(public season: number | string, public round: number | string) {}
}

export class GetSeasonDriverStandings {
  static readonly type = '[Round Driver Standings] Get Round Driver Standings';

  constructor(public season: number | string) {}
}

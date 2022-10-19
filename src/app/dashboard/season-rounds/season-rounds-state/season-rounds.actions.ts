export class GetRounds {
  static readonly type = '[Season Rounds] Get';

  constructor() { }
}

export class GetDriverStandings {
  static readonly type = '[Season Rounds] Get Driver Standings';

  constructor(public season: number | string, public round: number | string) {}
}

export class GetDriverStandings {
  static readonly type = '[Driver Standings] Get Driver Standings';

  constructor(public season: number | string, public round: number | string) {}
}

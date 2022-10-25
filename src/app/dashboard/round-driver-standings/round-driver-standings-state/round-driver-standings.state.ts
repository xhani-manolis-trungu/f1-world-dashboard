import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { map } from "rxjs/operators";
import { DriverStanding } from "src/app/domain/driver-standing";
import { StandingsTable } from "src/app/domain/tables/standings-table";
import { RoundsService } from "src/app/services/rounds.service";
import { GetRoundDriverStandings, GetSeasonDriverStandings } from "./round-driver-standings.actions";

export class RoundDriverStandingsModel {
  standings!: DriverStanding[];
}

@State<RoundDriverStandingsModel>({
  name: "roundDriverStandingsState",
  defaults: {
    standings: [],
  },
})
@Injectable()
export class RoundDriverStandingsState {
  constructor(private roundsService: RoundsService) {}

  @Selector()
  static roundDriverStandings(state: RoundDriverStandingsModel) {
    return state.standings;
  }

  @Action(GetRoundDriverStandings)
  getDriverStandings(
    { patchState }: StateContext<RoundDriverStandingsModel>,
    { season, round }: GetRoundDriverStandings
  ) {
    console.log(season, round)
    return this.roundsService
      .loadStandingsTable(season, round)
      .pipe(
        map((standingsTable: StandingsTable) => {
          const driverStandings: DriverStanding[] = [
            ...standingsTable.StandingsLists[0].DriverStandings
          ];
          return driverStandings;
        })
      )
      .subscribe(
        (driverStandings) => {
          patchState({ standings: [...driverStandings] });
        },
        (error) => { console.log(error) }
      );
  }
}

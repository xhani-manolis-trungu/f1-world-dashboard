import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { map } from "rxjs/operators";
import { DriverStanding } from "src/app/domain/driver-standing";
import { StandingsTable } from "src/app/domain/tables/standings-table";
import { RoundsService } from "src/app/services/rounds.service";
import { GetDriverStandings } from "./driver-standings.actions";

export class DriverStandingsModel {
  standings!: DriverStanding[];
}

@State<DriverStandingsModel>({
  name: "driverStandingsState",
  defaults: {
    standings: [],
  },
})
@Injectable()
export class DriverStandingsState {
  constructor(private roundsService: RoundsService) {}

  @Selector()
  static driverStandings(state: DriverStandingsModel) {
    return state.standings;
  }

  @Action(GetDriverStandings)
  getDriverStandings(
    { patchState }: StateContext<DriverStandingsModel>,
    { season, round }: GetDriverStandings
  ) {
    return this.roundsService
      .loadStandingsTable(season, round)
      .pipe(
        map((standingsTable: StandingsTable) => {
          const driverStandings: DriverStanding[] = [
            ...standingsTable.StandingsLists[0].DriverStandings,
          ];
          return driverStandings;
        })
      )
      .subscribe(
        (driverStandings) => {
          patchState({ standings: driverStandings });
        },
        (error) => { console.log(error) }
      );
  }
}

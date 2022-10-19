import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EMPTY, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DriverStanding } from "src/app/domain/driver-standing";
import { Race } from "src/app/domain/race";
import { Season } from "src/app/domain/season";
import { StandingsTable } from "src/app/domain/tables/standings-table";
import { RoundsService } from "src/app/services/rounds.service";
import { GetDriverStandings, GetRounds } from "./season-rounds.actions";

export class SeasonRoundsModel {
  rounds!: Race[];
  standings!: StandingsTable | DriverStanding[] | null;
  areLoadedRaces!: boolean;
}

@State<SeasonRoundsModel>({
  name: 'roundsState',
  defaults: {
    rounds: [],
    standings: null,
    areLoadedRaces: false
  }
})

@Injectable()
export class RoundsState {
  constructor(
    private roundsService: RoundsService,
    private http: HttpClient) {

  }

  @Selector()
  static getRoundsList(state: SeasonRoundsModel): Race[] {
    return state.rounds;
  }

  @Selector()
  static areRoundsLoaded(state: SeasonRoundsModel) {
    return state.areLoadedRaces;
  }

  @Selector()
  static driverStandings(state: SeasonRoundsModel) {
    return state.standings
  }

  @Action(GetRounds)
  getRounds() {
    return this.roundsService.rounds;
  }

  @Action(GetDriverStandings)
  getDriverStandings({patchState}: StateContext<SeasonRoundsModel>, {season, round}: GetDriverStandings) {
    return this.roundsService.loadStandingsTable(season, round)
      .pipe(
        map((standingsTable: StandingsTable) => {
          const driverStandings: DriverStanding[] = standingsTable.StandingsLists[0].DriverStandings
          return driverStandings;
        })
      ).subscribe(driverStandings => {
          patchState({standings: [...driverStandings]})
      })
  }
}

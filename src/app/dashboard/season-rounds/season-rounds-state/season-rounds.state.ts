import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Race } from "src/app/domain/race";
import { StandingsTable } from "src/app/domain/tables/standings-table";
import { RoundsService } from "src/app/services/rounds.service";
import { GetRounds } from "./season-rounds.actions";

export class SeasonRoundsModel {
  rounds!: Race[];
  areLoadedRaces!: boolean;
}

@State<SeasonRoundsModel>({
  name: 'roundsState',
  defaults: {
    rounds: [],
    areLoadedRaces: false
  }
})

@Injectable()
export class RoundsState {
  constructor(
    private roundsService: RoundsService) {
  }

  @Selector()
  static getRoundsList(state: SeasonRoundsModel): Race[] {
    return state.rounds;
  }

  @Selector()
  static areRoundsLoaded(state: SeasonRoundsModel) {
    return state.areLoadedRaces;
  }

  @Action(GetRounds)
  getRounds({patchState}: StateContext<SeasonRoundsModel>) {
    return this.roundsService.rounds
    .subscribe(
      (races) => {
        patchState({rounds: [...races], areLoadedRaces: true});
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

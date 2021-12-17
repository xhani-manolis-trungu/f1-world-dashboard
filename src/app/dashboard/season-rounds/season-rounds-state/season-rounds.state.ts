import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Race } from "src/app/domain/race";
import { RoundsService } from "src/app/services/rounds.service";
import { SeasonsService } from "src/app/services/seasons.service";
import { GetRounds } from "./season-rounds.actions";

export class SeasonRoundsModel {
  rounds!: Race[];
  areLoadedRaces!: boolean;
}

@State<SeasonRoundsModel>({
  name: 'season-rounds',
  defaults: {
    rounds: [],
    areLoadedRaces: false
  }
})

export class RoundsState {
  constructor(private roundsService: RoundsService, private seasonService: SeasonsService) {

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
  getRounds({ getState, setState }: StateContext<SeasonRoundsModel>) {
    return this.roundsService.rounds;
  }
}

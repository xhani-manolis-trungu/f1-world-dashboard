import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Driver } from "src/app/domain/driver";
import { RoundsService } from "src/app/services/rounds.service";
import { GetDriverInfo } from "./driver-info.actions";

export class DriverInfoModel {
  info!: Driver[];
}

@State<DriverInfoModel>({
  name: "driverInfoState",
  defaults: {
    info: [],
  },
})
@Injectable()
export class DriverInfoState {
  constructor(private roundsService: RoundsService) {}

  @Selector()
  static driverInfo(state: DriverInfoModel) {
    return state;
  }

  @Action(GetDriverInfo)
  getDriverInfo(
    { patchState }: StateContext<DriverInfoModel>,
    { driverInfo }: GetDriverInfo
  ) {
    patchState({ info: driverInfo });
  }
}

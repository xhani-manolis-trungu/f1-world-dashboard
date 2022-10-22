import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Driver } from "src/app/domain/driver";
import { RoundsService } from "src/app/services/rounds.service";
import { urlSplitter } from "src/app/utils/urlSplitter";
import { GetDriverImage } from "../../driver-image/driver-image-state/driver-image.actions";
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
  constructor(
    private roundsService: RoundsService,
    private store: Store
  ) {}

  @Selector()
  static driverInfo(state: DriverInfoModel) {
    return state.info;
  }

  @Action(GetDriverInfo)
  getDriverInfo(
    { patchState }: StateContext<DriverInfoModel>,
    { driverInfo }: GetDriverInfo
  ) {
    const driverName = urlSplitter(driverInfo[0].url);
    this.store.dispatch(new GetDriverImage(driverName));
    patchState({ info: driverInfo });
  }


}
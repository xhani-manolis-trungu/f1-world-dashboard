import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Driver } from "src/app/domain/driver";
import { RoundsService } from "src/app/services/rounds.service";
import { GetDriverImage } from "./driver-image.actions";

export class DriverImageModel {
  image!: string[];
}

@State<DriverImageModel>({
  name: "driverImageState",
  defaults: {
    image: [],
  },
})
@Injectable()
export class DriverImageState {
  constructor(
    private roundsService: RoundsService,
    private store: Store
  ) {}

  @Selector()
  static driverInfo(state: DriverImageModel) {
    return state.image;
  }

  @Action(GetDriverImage)
  getDriverInfo(
    { patchState }: StateContext<DriverImageModel>,
    { driverImage }: GetDriverImage
  ) {
    patchState({ image: driverImage });
  }
}

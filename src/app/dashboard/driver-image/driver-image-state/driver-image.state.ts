import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DriverImage } from "src/app/domain/driverImage";
import { DriverService } from "src/app/services/driver.service";
import { GetDriverImage, SetDriverName } from "./driver-image.actions";

export class DriverImageModel {
  name!: string | null;
  imageUrl!: string | null;
  imageHeight!: number | null;
  imageWidth!: number | null;
}

@State<DriverImageModel>({
  name: "driverImageState",
  defaults: {
    name: null,
    imageUrl: null,
    imageHeight: null,
    imageWidth: null
  },
})
@Injectable()
export class DriverImageState {
  constructor(
    private http: HttpClient,
    private driverService: DriverService
  ) {}

  @Selector()
  static driverName(state: DriverImageModel) {
    return state.name;
  }

  @Selector()
  static driverImageUrl(state: DriverImageModel) {
    return state.imageUrl;
  }

  @Action(SetDriverName)
  getDriverInfo(
    { patchState, dispatch, getState }: StateContext<DriverImageModel>,
    { driverName }: SetDriverName
  ) {
    dispatch(new GetDriverImage(driverName));
    patchState({
      name: driverName,
    });
  }

  @Action(GetDriverImage)
  getDriverImage(
    { patchState, getState }: StateContext<DriverImageModel>,
    { driverName }: GetDriverImage) {
      this.driverService.getDriverImage(driverName).subscribe((imageData: DriverImage) => {
        patchState({ imageUrl: imageData.imageUrl, imageHeight: imageData.imageHeight, imageWidth: imageData.imageWidth });
      });
  }

}

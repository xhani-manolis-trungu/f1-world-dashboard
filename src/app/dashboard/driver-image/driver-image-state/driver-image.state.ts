import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Driver } from "src/app/domain/driver";
import { RoundsService } from "src/app/services/rounds.service";
import { GetDriverImage } from "./driver-image.actions";

export class DriverImageModel {
  image!: string[];
  imageUrl!: string | null;
}

@State<DriverImageModel>({
  name: "driverImageState",
  defaults: {
    image: [],
    imageUrl: null
  },
})
@Injectable()
export class DriverImageState {
  constructor(
    private http: HttpClient
  ) {}

  @Selector()
  static driverImage(state: DriverImageModel) {
    return state.image;
  }

  @Selector()
  static driverImageUrl(state: DriverImageModel) {
    return state.imageUrl;
  }

  @Action(GetDriverImage)
  getDriverInfo(
    { patchState }: StateContext<DriverImageModel>,
    { driverImage }: GetDriverImage
  ) {
    // create proper url to get image from wikipedia

    // const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${driverImage}`;
    // const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&titles=Albert Einstein`
    // this.http.get(url).subscribe((data: any) => {
    //   const pageId = Object.keys(data.query.pages)[0];
    //   const imageUrl = data.query.pages[pageId].original.source;

    //   patchState({ imageUrl: imageUrl });
    // })
    patchState({
      image: driverImage,
    });
  }

}

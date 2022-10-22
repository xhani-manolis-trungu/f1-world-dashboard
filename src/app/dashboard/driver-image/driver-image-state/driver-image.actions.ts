import { Driver } from "src/app/domain/driver";

export class GetDriverImage {
  static readonly type = '[Driver Image] Get Driver Image';

  constructor(public driverImage: string[]) {}
}

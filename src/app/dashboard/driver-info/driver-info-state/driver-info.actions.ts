import { Driver } from "src/app/domain/driver";

export class GetDriverInfo {
  static readonly type = '[Driver Info] Get Driver Info';

  constructor(public driverInfo: Driver[]) {}
}

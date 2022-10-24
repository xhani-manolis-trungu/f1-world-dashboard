
export class SetDriverName {
  static readonly type = '[Driver Name] Set Driver Name';

  constructor(public driverName: string) {}
}

export class GetDriverImage {
  static readonly type = `[Driver Image] Get Driver Image`;

  constructor(public driverName: string) {}
}

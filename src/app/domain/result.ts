import { Driver } from './driver';
import { Constructor } from './constructor';
import { Time } from './time';

export class Result {

  number!: string;
  position!: number;
  positionText!: string;
  points!: number;

  Driver!: Driver;
  Constructor!: Constructor;

  grid!: number;
  laps!: string;
  status!: string;

  Time!: Time;
}

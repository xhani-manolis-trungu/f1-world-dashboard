import { Circuit } from './circuit';
import { Result } from './result';
import { Lap } from './lap';
import { PitStop } from './pitstop';
import { QualifyingResult } from './qualifying-result';

export class Race {
  season!: string;
  round!: string;
  url!: string;
  raceName!: string;
  Circuit!: Circuit;
  date!: string;
  time!: string;

  Results!: Result[];

  QualifyingResults!: QualifyingResult[];

  Laps!: Lap[];

  PitStops!: PitStop[];
}

import { Race } from './race.model';
import { Trait } from './traits.model';

export interface RaceTrait {
  id: number;
  race: Race;
  raceId: number;
  trait: Trait;
  traitId: number;
}

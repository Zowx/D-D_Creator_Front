import { Race } from './race.model';
import { Trait } from './trait.model';

export interface RaceTrait {
  id: number;
  race: Race;
  raceId: number;
  trait: Trait;
  traitId: number;
}

import { Ability } from './ability.model';
import { Character } from './character.model';

export interface Class {
  id: number;
  name: string;
  caster_type: string;
  subclass: string;
  savingThrows: Ability[];
  hit_dice: string;
  characters?: Character[];
}

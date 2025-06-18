import { Ability } from './ability.model';
import { Character } from './character.model';

export interface Class {
  id: string;
  name: string;
  hitDice: string | null;  // null pour les sous-classes
  savingThrows: string[];  // array d'IDs d'abilities
  subClass?: string;       // ID de la classe parente pour les sous-classes
  caster_type?: string;    // optionnel
  characters?: Character[];
}

import { Character } from './character.model';
import { Ability } from './ability.model';

export interface CharacterAbility {
  id: number;
  character: Character;
  characterId: number;
  ability: Ability;
  abilityId: number;
}

import { Character } from './character.model';
import { Skill } from './skill.model';

export interface PlayerSkill {
  id: number;
  value: string;
  character: Character;
  characterId: number;
  skills: Skill[];
}

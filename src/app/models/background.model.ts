import { Character } from './character.model';
import { BackgroundSkill } from './backgroundskill.model';
export interface Background {
  id: number;
  name: string;
  description: string;
  character?: Character;
  skills?: BackgroundSkill[];
}

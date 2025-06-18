import { Character } from './character.model';
import { BackgroundSkill } from './backgroundskill.model';

export interface Background {
  id: string;
  name: string;
  description: string;
  abilityChoice: number;
  skillsIds: BackgroundSkill[];
  skillChoice: number;
  languagesIds: any[];
  languagesChoice: number;
  connectionAndMemento?: string;
  adventuresAndAdvancement?: string;
  featureName: string;
  featureDescription: string;
  character?: Character;
}

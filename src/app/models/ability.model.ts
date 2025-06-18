import { Skill } from './skill.model';
import { Class } from './class.model';
import { CharacterAbility } from './characterability.model';
export interface Ability {
  id: number;
  name: string;
  description: string;
  short_desc: string;
  // skillid?: number;
  // skill?: Skill;
  // class?: Class[];
  // characterAbilities?: CharacterAbility[];
}

// Assurez-vous que les interfaces Skill, Class et CharacterAbility existent ou importez-les si besoin.
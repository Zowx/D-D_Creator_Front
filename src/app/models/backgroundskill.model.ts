import { Skill } from './skill.model';
import { Background } from './background.model';

export interface BackgroundSkill {
  id: number;
  skill_potential: Skill;
  skillId: number;
  background: Background;
  backgroundId: number;
}

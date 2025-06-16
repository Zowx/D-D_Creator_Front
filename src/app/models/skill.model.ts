import { Ability } from './ability.model';
import { PlayerSkill } from './playerskill.model';
import { BackgroundSkill } from './backgroundskill.model';
export interface Skill {
    id: number;
    name: string;
    description: string;
    ability: Ability[];
    playerSkill: PlayerSkill[];
    backgroundSkill: BackgroundSkill[];
}
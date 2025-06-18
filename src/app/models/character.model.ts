export interface Character {
  id: string;
  raceId: string;
  classId: string;
  backgroundId: string;
  alignmentId: string;
  userId?: string;

  xp: number;
  level: number;
  name: string;
  player: string;
  AC: number;
  speed: number;
  hp: number;
  maxHp: number;
  tempHp: number;
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  age: number;
  height: string;
  weight: string;
  eyes: string;
  skin: string;
  hair: string;
  appearance: string;
  allies: string;
  backstory: string;
  treasure: string;
  traits: string;

  // race: Race;
  // class: Class;
  // background: Background;
  // alignment: Alignment;

  // abilities: CharacterAbility[];
  languages: string[]; 
}

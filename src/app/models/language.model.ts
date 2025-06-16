import { CharacterLanguage } from './characterlanguage.model';
export interface Language {
  id: number;
  name: string;
  description: string;
  exotic: boolean;
  characters?: CharacterLanguage[];
}

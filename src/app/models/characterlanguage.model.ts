import { Character } from './character.model';
import { Language } from './language.model';

export interface CharacterLanguage {
  id: number;
  character: Character;
  characterId: number;
  language: Language;
  languageId: number;
}

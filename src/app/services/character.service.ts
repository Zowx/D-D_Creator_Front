import { Injectable } from '@angular/core';
import { CharacterLite } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  async getAllCharacters(): Promise<CharacterLite[]> {
    return [
      {
        id: 1,
        name: 'John Doe',
        level: 5,
        class: 'Warrior',
        race: 'Human',
      },
      {
        id: 2,
        name: 'Jane Smith',
        level: 7,
        class: 'Mage',
        race: 'Elf',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        level: 3,
        class: 'Rogue',
        race: 'Dwarf',
      },
    ];
  }
}

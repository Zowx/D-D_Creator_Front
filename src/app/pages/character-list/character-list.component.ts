import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { CharacterLite } from '../../models/character.model';
import { CharCardComponent } from '../../components/char-card/char-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  imports: [
    NgFor,
    CharCardComponent,
  ],
})
export class CharacterListComponent {
  protected characters: CharacterLite[] = [];
  
  constructor(
    private readonly characterService: CharacterService,
  ) { }

  ngOnInit() {
    this.getAllCharacters();
  }

  private async getAllCharacters() {
    this.characters = await this.characterService.getAllCharacters();
  }

  protected onCardClick(event: any) {
    console.log('Card clicked with ID:', event);
  };
}

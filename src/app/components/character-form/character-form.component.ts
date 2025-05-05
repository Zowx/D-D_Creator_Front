import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CharacterFormComponent implements OnInit {
  character: Character = {
    nom: '',
    sexe: 'Homme',
    alignement: 'Neutre',
    age: 20,
    taille: '1,75 m',
    poids: '80 kg',
    px: 0,
    yeux: '',
    peau: '',
    cheveux: '',
    apparence: '',
    histoire: '',
    traits: '',
    ideaux: '',
    liens: '',
    defauts: '',
    allies: '',
    capacites: '',
  };

  sexeOptions = ['Homme', 'Femme', 'Autre'];
  alignementOptions = [
    'Neutre',
    'Loyal Bon',
    'Chaotique Bon',
    'Loyal Neutre',
    'Chaotique Neutre',
    'Loyal Mauvais',
    'Chaotique Mauvais',
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialisation du composant
  }

  onSubmit(): void {
    console.log('Personnage sauvegardé:', this.character);
    // Ici vous pourriez appeler un service pour enregistrer le personnage
    // this.characterService.saveCharacter(this.character);
    alert('Personnage sauvegardé avec succès !');
  }
}

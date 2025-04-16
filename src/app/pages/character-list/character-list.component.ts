import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterFormComponent } from '../../components/character-form/character-form.component';
import { SelectionGridComponent } from '../../components/selection-grid/selection-grid.component';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CharacterFormComponent, SelectionGridComponent],
})
export class CharacterListComponent {
  // Logic for the Character List page can be added here
  showForm = true; // Variable pour contrôler l'affichage du formulaire
}

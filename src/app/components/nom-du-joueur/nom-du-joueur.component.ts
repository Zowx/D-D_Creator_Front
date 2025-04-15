import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nom-du-joueur',
  standalone: true,
  templateUrl: './nom-du-joueur.component.html',
  styleUrl: './nom-du-joueur.component.scss',
})
export class NomDuJoueurComponent {
  userName = '';

  @Output() selectItem = new EventEmitter<string>();

  updateName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.userName = inputElement.value;
    this.selectItem.emit(this.userName);
  }
}

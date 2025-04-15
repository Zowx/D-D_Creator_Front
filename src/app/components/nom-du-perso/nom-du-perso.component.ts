import { Component } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'nom-du-perso',
  standalone: true,
  imports: [],
  templateUrl: './nom-du-perso.component.html',
  styleUrl: './nom-du-perso.component.scss'
})
export class NomDuPersoComponent {
  persoName = '';

  @Output() selectItem = new EventEmitter<string>();

  updateName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.persoName = inputElement.value;
    this.selectItem.emit(this.persoName);
  }

}

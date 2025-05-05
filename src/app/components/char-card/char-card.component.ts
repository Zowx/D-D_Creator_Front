import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CharacterLite } from '../../models/character.model';

@Component({
  selector: 'app-char-card',
  templateUrl: './char-card.component.html',
  styleUrl: './char-card.component.scss'
})
export class CharCardComponent {
  @Input() character: CharacterLite = {} as CharacterLite;

  @Output() onClick: EventEmitter<number> = new EventEmitter<number>();

  cardClick() {
    this.onClick.emit(this.character.id);
  }
}

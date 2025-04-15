import { Component } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'alignementSelector',
  standalone: true,
  imports: [],
  templateUrl: './alignement.component.html',
  styleUrl: './alignement.component.scss'
})
export class AlignementComponent {

  selectedAlignment = 'Neutre';

  @Output() selectItem = new EventEmitter<string>();

  updateAlignement(event: Event) {
    const selectItem = event.target as HTMLSelectElement;
    this.selectedAlignment = selectItem.value;
    this.selectItem.emit(this.selectedAlignment);
  }


}

import { Component } from '@angular/core';
import { FormPersoComponent } from '../../components/form-perso/form-perso.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'creation-perso',
  standalone: true,
  imports: [ FormPersoComponent, DragDropModule, NavbarComponent],
  templateUrl: './creation-perso.component.html',
  styleUrl: './creation-perso.component.scss'
})
export class CreationPersoComponent {

}

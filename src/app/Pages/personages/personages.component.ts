import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'personages',
  standalone: true,
  imports: [ NavbarComponent],
  templateUrl: './personages.component.html',
  styleUrl: './personages.component.scss'
})
export class PersonagesComponent {

}

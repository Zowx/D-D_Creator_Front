import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreationPersoComponent} from './Pages/creation-perso/creation-perso.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import {NavbarComponent} from './components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreationPersoComponent, DragDropModule, NavbarComponent, RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'D-DCreation_ProjetFront';
}

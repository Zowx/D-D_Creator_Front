import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DragDropModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'D-DCreation_ProjetFront';
}

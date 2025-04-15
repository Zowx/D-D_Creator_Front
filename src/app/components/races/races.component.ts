import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecupRaceService } from '../../services/recup-race.service';
import { NgFor, NgIf } from '@angular/common';
import { IRaces, IAsi } from '../../interfaces/iraces';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'races',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './races.component.html',
  styleUrl: './races.component.scss',
})
export class RacesComponent {
  resultRace: IRaces[] = [];
  resultAsi: IAsi[] = [];
  selectedRace: string = '';
  hoveredRace: any = null;

  @Input() race: string[] = [];

  @Input() asi: string[] = [];

  @Output() selectItem = new EventEmitter<string>();

  constructor(private recupRaceService: RecupRaceService) {}
  ngOnInit() {
    this.loadRaces();
  }

  loadRaces() {
    this.recupRaceService.getAllRaces().subscribe({
      next: (datarace) => {
        console.log(datarace);
        this.resultRace = datarace;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  choiceRace(race: any, name : string) {
    if (!race?.target?.innerText) return;
    this.selectedRace = name;
    this.selectItem.emit(name);
    
  }
}

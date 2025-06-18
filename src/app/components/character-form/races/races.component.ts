import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { RacesService } from '../../../services/races/races.service';
import { Race } from '../../../models/race.model';

@Component({
  selector: 'app-races',
  imports: [ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss', '../../../shared/shared-style.scss'],
})
export class RacesComponent implements OnInit {
  @Input() formRacesGroup!: FormGroup;
  raceList: string[] = [];
  racesData: Race[] = []; // Stockage des données complètes des races
  mainRaces: Race[] = []; // Races principales (sans sous-race)
  subRaces: Race[] = []; // Sous-races
  selectedRaceData: Race | null = null; // Variable pour stocker la race sélectionnée
  selectedSubRaces: Race[] = []; // Sous-races de la race sélectionnée
  selectedSubRace: Race | null = null; // Sous-race sélectionnée

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly racesService: RacesService
  ) {}

  loadRaces() {
    this.racesService.getRaces().subscribe({
      next: (dataRaces) => {
        this.racesData = dataRaces; // Stockage des données complètes
        this.mainRaces = dataRaces.filter((race) => !race.subrace_of);
        this.subRaces = dataRaces.filter((race) => race.subrace_of);

        // Liste des noms des races principales pour l'affichage
        this.raceList = this.mainRaces.map((race) => race.name);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des races:', err);
      },
    });
  }


  // Fonction pour quand une race est sélectionnée
  onRaceSelected(raceName: string) {
    // Trouver les données complètes de la race sélectionné
    this.selectedRaceData =
      this.mainRaces.find((race) => race.name === raceName) || null;

    if (this.selectedRaceData) {
      // Trouver les sous-races associées a cette race
      this.selectedSubRaces = this.subRaces.filter(
        (subRace) => subRace.subrace_of === this.selectedRaceData!.id.toString()
      );
    }

    // Réinitialiser la sous-race sélectionnée
    this.selectedSubRace = null;
    const subRaceControl = this.formRacesGroup?.get('selectedSubRace');
    if (subRaceControl) {
      subRaceControl.setValue(null);
    }
  }

  onSubRaceSelected(subRaceName: string) {
    this.selectedSubRace =
      this.selectedSubRaces.find((subRace) => subRace.name === subRaceName) ||
      null;
  }

  get races(): FormArray {
    return this.formRacesGroup.get('formRaces.races') as FormArray;
  }

  ngOnInit(): void {
    if (!this.formRacesGroup) {
      console.error("formRacesGroup n'est pas défini");
      return;
    }

    this.loadRaces();

    const selectedRaceControl = this.formRacesGroup.get('selectedRace');
    const selectedSubRaceControl = this.formRacesGroup.get('selectedSubRace');

    if (selectedRaceControl) {
      selectedRaceControl.valueChanges.subscribe((selectedRaceName) => {
        if (selectedRaceName) {
          this.onRaceSelected(selectedRaceName);
        }
      });
    }

    if (selectedSubRaceControl) {
      selectedSubRaceControl.valueChanges.subscribe((selectedSubRaceName) => {
        if (selectedSubRaceName) {
          this.onSubRaceSelected(selectedSubRaceName);
        }
      });
    }
  }

  get selectedRace(): FormControl {
    return this.formRacesGroup?.get('selectedRace') as FormControl;
  }

  get selectedSubRaceControl(): FormControl {
    return this.formRacesGroup?.get('selectedSubRace') as FormControl;
  }

  onSubmit() {
    console.log('Form submitted!');
  }

  public getRaces(id: string){
    const race = this.mainRaces.find((c) => c.id == id);
    if(race) {
      return race.name;
    } else {
      return null;
    }
  }

  public getRacesId(name: string) {
    const raceId = this.mainRaces.find((c) => c.name === name);
    if (raceId) {
      return raceId.id;
    }
    return null;
  }
}

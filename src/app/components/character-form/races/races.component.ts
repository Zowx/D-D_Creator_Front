import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { NgFor } from '@angular/common';
import {RacesService} from '../../../services/races/races.service';
@Component({
  selector: 'app-races',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss', '../../../shared/shared-style.scss'],
})
export class RacesComponent {
  @Input() formRacesGroup!: FormGroup;
  raceList: string[] = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly racesService: RacesService
  ) {
  }

  initForm(): void {
    this.formRacesGroup = this.formBuilder.group({
      selectedRace: new FormControl(null)
    });
  }

  loadRaces() {
    this.racesService.getRaces().subscribe({
      next: (dataRaces) => {
        this.raceList = dataRaces.map((race) => race.name);
        console.log("les races", this.raceList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
    

  get races(): FormArray {
    return this.formRacesGroup.get('formRaces.races') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadRaces();
  }

  get selectedRace(): FormControl {
    return this.formRacesGroup.get('selectedRace') as FormControl;
  }

  onSubmit() {
    console.log('Form submitted!');
  }

}

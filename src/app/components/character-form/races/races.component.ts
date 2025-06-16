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
  raceList = ['humain', 'elfe', 'nain', 'halfelin', 'dragonborn', 'tieffelin'];

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  initForm(): void {
    this.formRacesGroup = this.formBuilder.group({
      selectedRace: new FormControl(null)
    });
  }

  get races(): FormArray {
    return this.formRacesGroup.get('formRaces.races') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
  }

  get selectedRace(): FormControl {
    return this.formRacesGroup.get('selectedRace') as FormControl;
  }

  onSubmit() {
    console.log('Form submitted!');
  }

}

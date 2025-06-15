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
  selector: 'app-equipement',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './equipement.component.html',
  styleUrl: './equipement.component.scss'
})
export class EquipementComponent {
  @Input() formEquipementGroup!: FormGroup;
  armeOptions = ['épée', 'arc', 'hache'];
  armureOptions = ['cuirasse', 'plaque', 'mailles'];

  get equipements(): FormArray {
    return this.formEquipementGroup.get('formEquipement.equipements') as FormArray;
  }


  ngOnint(): void {}

  get selectedArme(): FormControl {
    return this.formEquipementGroup.get('selectedArme') as FormControl;
  }

  get selectedArmure(): FormControl {
    return this.formEquipementGroup.get('selectedArmure') as FormControl;
  }

  onSubmit() {
    console.log('Form submitted!');
  }
}

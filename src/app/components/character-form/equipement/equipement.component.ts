import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
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

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  initForm(): void {
   this.formEquipementGroup = this.formBuilder.group({
    arme: new FormControl(null),
    armure: new FormControl(null)
  });
  }

  ngOnInit(): void {
    this.initForm()
  }

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

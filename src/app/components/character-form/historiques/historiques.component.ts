import { Component,Input } from '@angular/core';
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
  selector: 'app-historiques',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './historiques.component.html',
  styleUrl: './historiques.component.scss'
})
export class HistoriquesComponent {
  @Input() formHistoriquesGroup!: FormGroup;
  historiqueList = ['Acolyte', 'Artisan', 'Charlatan', 'Artiste', 'Hermit'];

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  initForm(): void {
    this.formHistoriquesGroup = this.formBuilder.group({
     selectedHistorique: new FormControl(null),
    });
  }

  get historiques(): FormArray {  
    return this.formHistoriquesGroup.get('formHistoriques.historiques') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
  }

  get selectedHistorique(): FormControl {
    return this.formHistoriquesGroup.get('selectedHistorique') as FormControl;
  }

  onSubmit() {
    console.log('Form submitted!');
  }
}

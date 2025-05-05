import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Character } from '../../../../interfaces/character';


@Component({
  selector: 'app-detail-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './detail-form.component.html',
  styleUrl: './detail-form.component.scss'
})
export class DetailFormComponent {
  @Input() public formDetail!: FormGroup;

  sexeOptions = ['Homme', 'Femme', 'Autre'];
  alignementOptions = [
    'Neutre',
    'Loyal Bon',
    'Chaotique Bon',
    'Loyal Neutre',
    'Chaotique Neutre',
    'Loyal Mauvais',
    'Chaotique Mauvais',
  ];
  constructor(
    private readonly formBuilder: FormBuilder
  ) {}



  ngOnInit(){
  }


  onSubmit() {
    console.log('Form submitted!');
  }
}

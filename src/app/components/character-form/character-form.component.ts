import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
  Form,
  FormControl,
} from '@angular/forms';
import { NgFor } from '@angular/common';
import {ClassesComponent} from './classes/classes.component';
// import {DetailFormComponent} from './sub-form/detail-form/detail-form.component';

@Component({
  selector: 'app-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor, ClassesComponent],
})
export class CharacterFormComponent implements OnInit {
  protected formCharacter!: FormGroup;
  protected formClasses!: FormGroup;
  protected formDetail!: FormGroup;
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
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formCharacter = this.formBuilder.group({
      formClasses: this.formBuilder.group({
        selectedClasse: new FormControl(null) 
      }),
      detailCharacter: this.formBuilder.group({
        nom: ["", Validators.required],
        sexe: ["", Validators.required],
        alignement: ["", Validators.required],
        age: ["", Validators.required],
        taille: ["", Validators.required],
        poids: ["", Validators.required],
        px: ["", Validators.required],
        yeux: [""],
        peau: [""],
        cheveux: [""],
        apparence: [""],
        histoire: [""],
        traits: [""],
        ideaux: [""],
        liens: [""],
        defauts: [""],
        allies: [""],
        capacites: [""],
      }),
    });
  }

  
  get formClassesGroup(): FormGroup {
    return this.formCharacter.get('formClasses') as FormGroup;
  }
  
  // get classes(): FormArray {
  //   return this.formCharacter.get('formClasses.classes') as FormArray;
  // }
  
  get detailCharacter(): FormGroup {
    return this.formCharacter.get('detail') as FormGroup;
  }
  onSubmit(): void {
    console.log('Personnage sauvegardé');
    alert('Personnage sauvegardé avec succès !');
  }
}

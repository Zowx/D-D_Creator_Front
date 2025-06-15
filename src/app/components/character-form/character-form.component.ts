import { Component, OnInit} from '@angular/core';
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
import {RacesComponent} from './races/races.component'
import {HistoriquesComponent} from './historiques/historiques.component';
import {LanguesComponent} from './langues/langues.component';
import {EquipementComponent} from './equipement/equipement.component';
// import {DetailFormComponent} from './sub-form/detail-form/detail-form.component';

@Component({
  selector: 'app-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor, ClassesComponent, RacesComponent, HistoriquesComponent, LanguesComponent, EquipementComponent],
})
export class CharacterFormComponent implements OnInit {
  protected formCharacter!: FormGroup;
  protected formClasses!: FormGroup;
  protected formRaces!: FormGroup;
  protected formHistoriques!: FormGroup;
  protected formLangues!: FormGroup;
  protected formEquipement!: FormGroup;
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
      formRaces: this.formBuilder.group({
        selectedRace: new FormControl(null)
      }),
      formHistoriques: this.formBuilder.group({
        selectedHistorique: new FormControl(null)
      }),
      formLangues: this.formBuilder.group({
        selectedLangue: new FormControl(null),
        langues: this.formBuilder.array([]) 
      }),
      formEquipement: this.formBuilder.group({
        selectedArme: new FormControl(null),
        selectedArmure: new FormControl(null),
        equipements: this.formBuilder.array([]) 
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
  get formRacesGroup(): FormGroup {
    return this.formCharacter.get('formRaces') as FormGroup; 
  }
  get formHistoriquesGroup(): FormGroup {
    return this.formCharacter.get('formHistoriques') as FormGroup;
  }
  get formLanguesGroup(): FormGroup {
    return this.formCharacter.get('formLangues') as FormGroup;
  }
  get formEquipementGroup(): FormGroup {
    return this.formCharacter.get('formEquipement') as FormGroup;
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

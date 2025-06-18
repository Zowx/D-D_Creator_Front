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
import {BackgroundsComponent} from './backgrounds/backgrounds.component';
import { LanguagesComponent } from './languages/languages.component';
import { CharacteristicComponent } from './characteristic/characteristic.component';
import { AlignmentService } from '../../services/alignment/alignment.service';

@Component({
  selector: 'app-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgFor,
    ClassesComponent,
    RacesComponent, 
    BackgroundsComponent,
    LanguagesComponent,
    CharacteristicComponent
  ],
})
export class CharacterFormComponent implements OnInit {
  protected formCharacter!: FormGroup;
  protected formClasses!: FormGroup;
  protected formRaces!: FormGroup;
  protected formBackgrounds!: FormGroup;
  protected formLanguages!: FormGroup;
  protected formCharacteristics!: FormGroup;
  protected formCaracteristics!: FormGroup;
  protected formEquipement!: FormGroup;
  protected formDetail!: FormGroup;
  sexeOptions = ['Homme', 'Femme', 'Autre'];
  alignmentOptions: string[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly alignmentService: AlignmentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAlignmentOptions();
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
      formLanguages: this.formBuilder.group({
        selectedLanguage: new FormControl(null),
        languages: this.formBuilder.array([]) 
      }),
      formCaracteristics: this.formBuilder.group({
        force: new FormControl(8, [Validators.required, Validators.min(8), Validators.max(15)]),
        dexterite: new FormControl(8, [Validators.required, Validators.min(8), Validators.max(15)]),
        constitution: new FormControl(8, [Validators.required, Validators.min(8), Validators.max(15)]),
        intelligence: new FormControl(8, [Validators.required, Validators.min(8), Validators.max(15)]),
        sagesse: new FormControl(8, [Validators.required, Validators.min(8), Validators.max(15)]),
        charisme: new FormControl(8, [Validators.required, Validators.min(8), Validators.max(15)]),
      }),
      formEquipement: this.formBuilder.group({
        selectedArme: new FormControl(null),
        selectedArmure: new FormControl(null),
        equipements: this.formBuilder.array([]) 
      }),
      detailCharacter: this.formBuilder.group({
        nom: ["", Validators.required],
        sexe: ["", Validators.required],
        alignment: ["", Validators.required],
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
    
    // Créer formDetail comme référence au sous-groupe
    this.formDetail = this.formCharacter.get('detailCharacter') as FormGroup;
  }

  loadAlignmentOptions(): void {
    this.alignmentService.getAllAlignments().subscribe({
      next: (data) => {
        this.alignmentOptions = data.map(alignment => alignment.name);
      },
      error: (err) => {
        console.error('Error fetching alignments:', err);
    }
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
  get formLanguagesGroup(): FormGroup {
    return this.formCharacter.get('formLanguages') as FormGroup;
  }
  get characteristics(): FormGroup {
    return this.formCharacter.get('formCaracteristics') as FormGroup;
  }
  get formEquipementGroup(): FormGroup {
    return this.formCharacter.get('formEquipement') as FormGroup;
  }
  get detailCharacter(): FormGroup {
    return this.formCharacter.get('detail') as FormGroup;
  }




  onSubmit(): void {
    console.log('Personnage sauvegardé');
  }
}

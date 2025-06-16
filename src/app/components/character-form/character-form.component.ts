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
import {AlignmentService} from '../../services/alignment/alignment.service';

@Component({
  selector: 'app-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor, ClassesComponent, RacesComponent, HistoriquesComponent, LanguesComponent],
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
  alignmentOptions: string[] = [];
  // alignmentOptions = [
  //   'Neutre',
  //   'Loyal Bon',
  //   'Chaotique Bon',
  //   'Loyal Neutre',
  //   'Chaotique Neutre',
  //   'Loyal Mauvais',
  //   'Chaotique Mauvais',
  // ];
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
  get formLanguesGroup(): FormGroup {
    return this.formCharacter.get('formLangues') as FormGroup;
  }
  get formEquipementGroup(): FormGroup {
    return this.formCharacter.get('formEquipement') as FormGroup;
  }
  get detailCharacter(): FormGroup {
    return this.formCharacter.get('detail') as FormGroup;
  }



  onSubmit(): void {
    console.log('Personnage sauvegardé');
    alert('Personnage sauvegardé avec succès !');
  }
}

import { Component, Input, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { NgFor } from '@angular/common';
import {ClassesService} from '../../../services/classes/classes.service';
import { Class } from '../../../models/class.model';

@Component({
  selector: 'app-classes',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './classes.component.html',
   styleUrls: [
    './classes.component.scss',
    '../../../shared/shared-style.scss',
  ]
})
export class ClassesComponent implements OnInit {
  @Input() formClassesGroup!: FormGroup;
  classList: string[] = [];
  classesData: Class[] = []; // Stockage des données complètes des classes
  selectedClasseData: Class | null = null; // Variable pour stocker la classe sélectionnée
  
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly classesService: ClassesService
  ) {}

  initForm(): void {
    this.formClassesGroup = this.formBuilder.group({
      selectedClasse: new FormControl(null) 
    });
  }
  loadClasses() {
    this.classesService.getClasses().subscribe({
      next: (dataClasses) => {
        this.classesData = dataClasses; // Stockage des données complètes
        this.classList = dataClasses.map((classe) => classe.name);
        for(var i = 0; i < this.classList.length; i++) {
          console.log("Classe==== " + (i + 1) + " : " + this.classList[i]);
          //afficher les detail des classes dans la console
          console.log("Détails de la classe " + (i + 1) + " : ", dataClasses[i]);
        }
        console.log("Les classes", this.classList);
        console.log("Données complètes des classes", this.classesData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //fonction pour quand une classe est selectionnée ses data soit stockées dans une variable
  onClasseSelected(className: string) {
    console.log('Classe sélectionnée:', className);
    // Trouver les données complètes de la classe sélectionnée
    this.selectedClasseData = this.classesData.find(classe => classe.name === className) || null;
    
    if (this.selectedClasseData) {
      console.log('Données complètes de la classe sélectionnée:', this.selectedClasseData);
      console.log('ID:', this.selectedClasseData.id);
      console.log('caster_type:', this.selectedClasseData.caster_type);
      console.log('subclass:', this.selectedClasseData.subclass);
      console.log('savingThrows:', this.selectedClasseData.savingThrows);
      console.log('hit_dice:', this.selectedClasseData.hit_dice);
    }
  }

  get classes(): FormArray {  
    return this.formClassesGroup.get('formClasses.classes') as FormArray;
  }
  ngOnInit(): void {
    this.initForm();
    this.loadClasses();
    
    this.selectedClasse.valueChanges.subscribe(selectedClassName => {
      if (selectedClassName) {
        this.onClasseSelected(selectedClassName);
      }
    });
  }
  
  get selectedClasse(): FormControl {
    return this.formClassesGroup.get('selectedClasse') as FormControl;
  }
  /**
   * Méthode publique pour récupérer les données de la classe sélectionnée
   */
  getSelectedClasseData(): Class | null {
    return this.selectedClasseData;
  }

  /**
   * Méthode pour vérifier si une classe est sélectionnée
   */
  hasSelectedClasse(): boolean {
    return this.selectedClasseData !== null;
  }

onSubmit() {
  console.log('Form submitted!');
}
}

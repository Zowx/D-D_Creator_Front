import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ClassesService } from '../../../services/classes/classes.service';
import { Class } from '../../../models/class.model';
import { Ability } from '../../../models/ability.model';
import { AbilityService } from '../../../services/ability/ability.service';

@Component({
  selector: 'app-classes',
  imports: [ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss', '../../../shared/shared-style.scss'],
})
export class ClassesComponent implements OnInit {
  @Input() formClassesGroup!: FormGroup;
  classList: string[] = [];
  classesData: Class[] = []; // Stockage des données complètes des classes
  mainClasses: Class[] = []; // Classes principales (sans sous-classe)
  subClasses: Class[] = []; // Sous-classes
  selectedClasseData: Class | null = null; // Variable pour stocker la classe sélectionnée
  selectedSubClasses: Class[] = []; // Sous-classes de la classe sélectionnée
  selectedClasseSavingThrows: Ability[] = []; // Noms des saving throws de la classe sélectionnée
  selectedSubClass: Class | null = null; // Sous-classe sélectionnée
  allAbilities: Ability[] = []; // toutes les abilities

  constructor(
    private readonly classesService: ClassesService,
    private readonly abilityService: AbilityService
  ) {}
  loadClasses() {
    this.classesService.getClasses().subscribe({
      next: (dataClasses) => {
        this.classesData = dataClasses; // Stockage des données complètes        
        // Séparer les classes principales des sous-classes
        this.mainClasses = dataClasses.filter(
          (classe) => classe.hitDice !== null
        );
        this.subClasses = dataClasses.filter(
          (classe) => classe.hitDice === null
        );

        // Liste des noms des classes principales pour l'affichage
        this.classList = this.mainClasses.map((classe) => classe.name);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des classes:', err);
      },
    });
  }

  loadAllAbilities() {
    this.abilityService.getAbility().subscribe({
      next: (abilities) => {
        this.allAbilities = abilities;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des abilities:', err);
      },
    });
  } 
  
  //fonction pour quand une classe est selectionnée ses data soit stockes dans une variable
  onClasseSelected(className: string) {
    // Trouver les données complètes de la classe sélectionnée
    this.selectedClasseData =
      this.mainClasses.find((classe) => classe.name === className) || null;

    if (this.selectedClasseData) {
      // Trouver les sous-classes associées à cette classe
      this.selectedSubClasses = this.subClasses.filter(
        (subClass) =>
          subClass.subClass === this.selectedClasseData!.id.toString()
      );

      // Charger les noms des saving throws
      this.loadSavingThrowsNames(this.selectedClasseData.savingThrows);
    }
    // Réinitialiser la sous-classe sélectionnée
    this.selectedSubClass = null;
    const subClassControl = this.formClassesGroup?.get('selectedSubClass');
    if (subClassControl) {
      subClassControl.setValue(null);
    }
  }

  onSubClassSelected(subClassName: string) {
    this.selectedSubClass =
      this.selectedSubClasses.find(
        (subClass) => subClass.name === subClassName
      ) || null;
  }
  loadSavingThrowsNames(savingThrowIds: any[]) {
    this.selectedClasseSavingThrows = [];

    if (savingThrowIds && savingThrowIds.length > 0) {
      if (typeof savingThrowIds[0] === 'object' && savingThrowIds[0].name) {
        this.selectedClasseSavingThrows = savingThrowIds;
      } else {
        console.log('Recherche des abilities par ID dans le cache local');
        //trouver les abilities
        savingThrowIds.forEach((id) => {
          const ability = this.allAbilities.find((a) => a.id === id.toString());
          if (ability) {
            this.selectedClasseSavingThrows.push(ability);
          }
        });
      }
    }
  }

  get classes(): FormArray {
    return this.formClassesGroup.get('formClasses.classes') as FormArray;
  }
  ngOnInit(): void {
    // Vérifier que le formGroup est bien défini
    if (!this.formClassesGroup) {
      console.error("formClassesGroup n'est pas défini");
      return;
    }

    // Charger les données
    this.loadClasses();
    this.loadAllAbilities();

    
    const selectedClasseControl = this.formClassesGroup.get('selectedClasse');
    const selectedSubClasseControl =
      this.formClassesGroup.get('selectedSubClass');

    if (selectedClasseControl) {
      selectedClasseControl.valueChanges.subscribe((selectedClassName) => {
        if (selectedClassName) {
          this.onClasseSelected(selectedClassName);
        }
      });
    }

    if (selectedSubClasseControl) {
      selectedSubClasseControl.valueChanges.subscribe(
        (selectedSubClassName) => {
          if (selectedSubClassName) {
            this.onSubClassSelected(selectedSubClassName);
          }
        }
      );
    }
  }
  get selectedClasse(): FormControl {
    return this.formClassesGroup?.get('selectedClasse') as FormControl;
  }

  get selectedSubClasse(): FormControl {
    return this.formClassesGroup?.get('selectedSubClass') as FormControl;
  }
  getAbilityById(id: string) {
    return this.abilityService.getAbilityById(id);
  }

  onSubmit() {
    console.log('Form submitted!');
  }
}

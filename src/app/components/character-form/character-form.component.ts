import { Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
  FormArray
} from '@angular/forms';
import { NgFor } from '@angular/common';
import {ClassesComponent} from './classes/classes.component';
import {RacesComponent} from './races/races.component'
import {BackgroundsComponent} from './backgrounds/backgrounds.component';
import {LanguagesComponent} from './languages/languages.component';
import {AlignmentService} from '../../services/alignment/alignment.service';

@Component({
  selector: 'app-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss', '../../shared/shared-style.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgFor,
    ClassesComponent,
    RacesComponent, 
    BackgroundsComponent,
    LanguagesComponent
  ],
})
export class CharacterFormComponent implements OnInit { 
  @ViewChild('classesComponent') classesComponent!: ClassesComponent;  
  @ViewChild('racesComponent') racesComponent!: RacesComponent;
  @ViewChild('backgroundsComponent') backgroundsComponent!: BackgroundsComponent;
  @ViewChild('languagesComponent') languagesComponent!: LanguagesComponent;
  
  protected formCharacter!: FormGroup;
  protected formClasses!: FormGroup;
  protected formRaces!: FormGroup;
  protected formBackgrounds!: FormGroup;
  protected formLanguages!: FormGroup;
  protected formEquipement!: FormGroup;
  protected formDetail!: FormGroup;  sexeOptions = ['Homme', 'Femme', 'Autre'];
  alignmentOptions: string[] = [];
  validationErrorMessage: string = '';

  // Validateur personnalisé pour s'assurer qu'exactement 2 langues sont sélectionnées
  private exactTwoLanguagesValidator(control: AbstractControl): ValidationErrors | null {
    if (control instanceof FormArray) {
      return control.length === 2 ? null : { exactTwoLanguages: true };
    }
    return null;
  }

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
        selectedClasse: new FormControl(null, Validators.required),
        selectedSubClass: new FormControl(null)
      }),      formRaces: this.formBuilder.group({
        selectedRace: new FormControl(null, Validators.required),
        selectedSubRace: new FormControl(null)
      }),      formHistoriques: this.formBuilder.group({
        selectedHistorique: new FormControl(null, Validators.required),
        selectedHistoriqueData: new FormControl(null)
      }),
      formLanguages: this.formBuilder.group({
        selectedLanguage: new FormControl(null),
        languages: this.formBuilder.array([], this.exactTwoLanguagesValidator) 
      }),
      detailCharacter: this.formBuilder.group({
        nom: ["", Validators.required],
        sexe: [""],
        alignment: ["", Validators.required],
        age: [""],
        taille: [""],
        poids: [""],
        px: [""],
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
    
    // Creer formDetail comme reference au sous-groupe
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
  get detailCharacter(): FormGroup {
    return this.formCharacter.get('detail') as FormGroup;
  } 
  
  private showValidationErrors(): void {
    const errors: string[] = [];
    
    // Vérifier les champs obligatoires
    if (this.formCharacter.get('formClasses.selectedClasse')?.invalid) {
      errors.push('• Une classe doit être sélectionnée');
    }
    
    if (this.formCharacter.get('formRaces.selectedRace')?.invalid) {
      errors.push('• Une race doit être sélectionnée');
    }
    
    if (this.formCharacter.get('formHistoriques.selectedHistorique')?.invalid) {
      errors.push('• Un background doit être sélectionné');
    }
    
    if (this.formCharacter.get('formLanguages.languages')?.invalid) {
      errors.push('• Exactement 2 langues doivent être sélectionnées');
    }
    
    if (this.formCharacter.get('detailCharacter.nom')?.invalid) {
      errors.push('• Le nom du personnage est obligatoire');
    }
    
    if (this.formCharacter.get('detailCharacter.alignment')?.invalid) {
      errors.push('• Un alignement doit être sélectionné');
    }
    
    // Stocker le message d'erreur
    if (errors.length > 0) {
      this.validationErrorMessage = 'Veuillez corriger les erreurs suivantes : ' + errors.join(' ');
    } else {
      this.validationErrorMessage = '';
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
      
      if (control instanceof FormArray) {
        control.controls.forEach((arrayControl) => {
          arrayControl.markAsTouched();
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          }
        });
      }
    });
  }

  onSubmit(): void {
    this.validationErrorMessage = '';
      // Vérification de la validité du formulaire
    if (!this.formCharacter.valid) {
      this.markFormGroupTouched(this.formCharacter);
      this.showValidationErrors();
      return;
    }

    const selectedClassData = this.classesComponent?.selectedClasseData || null;
    const selectedSubClassData = this.classesComponent?.selectedSubClass || null;
    const selectedClassSavingThrows = this.classesComponent?.selectedClasseSavingThrows || [];
    const selectedRaceData = this.racesComponent?.selectedRaceData || null;
    const selectedSubRaceData = this.racesComponent?.selectedSubRace || null; 
    const selectedBackgroundData = this.backgroundsComponent?.selectedBackgroundData || null;
    const selectedLanguagesData = this.languagesComponent?.selectedLanguagesData || [];
  
    
    //Collecte toute les données du formulaire avec les objets complets
    const formData = {
      classes: {
        selectedClasse: this.formCharacter.get('formClasses.selectedClasse')?.value,
        selectedSubClass: this.formCharacter.get('formClasses.selectedSubClass')?.value,
        selectedClassData: selectedClassData,
        selectedSubClassData: selectedSubClassData,
        selectedClassSavingThrows: selectedClassSavingThrows      },
      races: {
        selectedRace: this.formCharacter.get('formRaces.selectedRace')?.value,
        selectedSubRace: this.formCharacter.get('formRaces.selectedSubRace')?.value,
        selectedRaceData: selectedRaceData,
        selectedSubRaceData: selectedSubRaceData
      },      
      backgrounds: {
        selectedHistorique: this.formCharacter.get('formHistoriques.selectedHistorique')?.value,
        selectedHistoriqueData: selectedBackgroundData
      },      
      languages: {
        selectedLanguage: this.formCharacter.get('formLanguages.selectedLanguage')?.value,
        languages: this.formCharacter.get('formLanguages.languages')?.value || [],
        selectedLanguagesData: selectedLanguagesData
      },
      detailCharacter: {
        nom: this.formCharacter.get('detailCharacter.nom')?.value,
        sexe: this.formCharacter.get('detailCharacter.sexe')?.value,
        alignment: this.formCharacter.get('detailCharacter.alignment')?.value,
        age: this.formCharacter.get('detailCharacter.age')?.value,
        taille: this.formCharacter.get('detailCharacter.taille')?.value,
        poids: this.formCharacter.get('detailCharacter.poids')?.value,
        px: this.formCharacter.get('detailCharacter.px')?.value,
        yeux: this.formCharacter.get('detailCharacter.yeux')?.value,
        peau: this.formCharacter.get('detailCharacter.peau')?.value,
        cheveux: this.formCharacter.get('detailCharacter.cheveux')?.value,
        apparence: this.formCharacter.get('detailCharacter.apparence')?.value,
        histoire: this.formCharacter.get('detailCharacter.histoire')?.value,
        traits: this.formCharacter.get('detailCharacter.traits')?.value,
        ideaux: this.formCharacter.get('detailCharacter.ideaux')?.value,
        liens: this.formCharacter.get('detailCharacter.liens')?.value,
        defauts: this.formCharacter.get('detailCharacter.defauts')?.value,
        allies: this.formCharacter.get('detailCharacter.allies')?.value,
        capacites: this.formCharacter.get('detailCharacter.capacites')?.value
      }
    };

    //Créer un tableau avec toute les données 
    const characterDataArray = [
      {
        section: 'Classes',
        selection: {
          selectedClasse: formData.classes.selectedClasse,
          selectedSubClass: formData.classes.selectedSubClass,
          
        },
        completeData: {
          classeComplete: formData.classes.selectedClassData,
          subClasseComplete: formData.classes.selectedSubClassData,
          selectedClassSavingThrows: formData.classes.selectedClassSavingThrows
        }
      },      {
        section: 'Races',
        selection: {
          selectedRace: formData.races.selectedRace,
          selectedSubRace: formData.races.selectedSubRace
        },        
        completeData: {
          raceComplete: formData.races.selectedRaceData,
          subRaceComplete: formData.races.selectedSubRaceData
        }
      },
      {
        section: 'Backgrounds',
        selection: {
          selectedHistorique: formData.backgrounds.selectedHistorique
        },
        completeData: {
          historiqueComplete: formData.backgrounds.selectedHistoriqueData
        }
      },
      {
        section: 'Languages',
        selection: {
          selectedLanguage: formData.languages.selectedLanguage,
          languages: formData.languages.languages
        },
        completeData: {
          languagesComplete: formData.languages.selectedLanguagesData
        }
      },
      {
        section: 'Détails du personnage',
        selection: formData.detailCharacter
      }
    ];

    console.log('Données du personnage:', characterDataArray); 
  }
}

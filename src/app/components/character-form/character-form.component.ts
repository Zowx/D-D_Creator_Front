import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ClassesComponent } from './classes/classes.component';
import { RacesComponent } from './races/races.component'
import { BackgroundsComponent } from './backgrounds/backgrounds.component';
import { CharacteristicComponent } from './characteristic/characteristic.component';
import { LanguagesComponent } from './languages/languages.component';
import { AlignmentService } from '../../services/alignment/alignment.service';
import { CharacterService } from '../../services/character/character.service';
import { Character } from '../../models/character.model';

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
    LanguagesComponent,
    CharacteristicComponent
  ],
})
export class CharacterFormComponent implements OnInit {
  @ViewChild('classesComponent') classesComponent!: ClassesComponent;
  @ViewChild('racesComponent') racesComponent!: RacesComponent;
  @ViewChild('backgroundsComponent') backgroundsComponent!: BackgroundsComponent;
  @ViewChild('languagesComponent') languagesComponent!: LanguagesComponent;
  @ViewChild('characteristicComponent') characteristicComponent!: CharacteristicComponent;
  protected formCharacter!: FormGroup;
  protected formClasses!: FormGroup;
  protected formRaces!: FormGroup;
  protected formBackgrounds!: FormGroup;
  protected formLanguages!: FormGroup;
  protected formCharacteristics!: FormGroup;
  protected formCaracteristics!: FormGroup;
  protected formEquipement!: FormGroup;
  protected formDetail!: FormGroup;
  alignmentOptions: string[] = [];
  characterListe: Character[] = [
  ];
  selectedCharacter: Character | null = null;
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
    private readonly alignmentService: AlignmentService,
    private readonly characterService: CharacterService
  ) { }
  ngOnInit(): void {
    this.initForm();
    this.loadAlignmentOptions();
    this.getAllCharacters();
    this.loadCharacterData();
  }

  initForm(): void {
    this.formCharacter = this.formBuilder.group({
      selectedCharacter: new FormControl(null),
      formClasses: this.formBuilder.group({
        selectedClasse: new FormControl(null, Validators.required),
        selectedSubClass: new FormControl(null)
      }),
      formRaces: this.formBuilder.group({
        selectedRace: new FormControl(null, Validators.required),
        selectedSubRace: new FormControl(null)
      }), formHistoriques: this.formBuilder.group({
        selectedHistorique: new FormControl(null, Validators.required),
        selectedHistoriqueData: new FormControl(null)
      }),
      formLanguages: this.formBuilder.group({
        selectedLanguage: new FormControl(null),
        languages: this.formBuilder.array([])
      }),
      formCaracteristic: this.formBuilder.group({
        force: new FormControl(8, [Validators.min(8), Validators.max(15)]),
        dexterite: new FormControl(8, [Validators.min(8), Validators.max(15)]),
        constitution: new FormControl(8, [Validators.min(8), Validators.max(15)]),
        intelligence: new FormControl(8, [Validators.min(8), Validators.max(15)]),
        sagesse: new FormControl(8, [Validators.min(8), Validators.max(15)]),
        charisme: new FormControl(8, [Validators.min(8), Validators.max(15)]),
      }), formEquipement: this.formBuilder.group({
        selectedArme: new FormControl(null),
        selectedArmure: new FormControl(null),
        equipements: this.formBuilder.array([])
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

  loadCharacterData(): void {
    this.characterService.getAllCharacter().subscribe({
      next: (data) => {
        this.characterListe = data;
      },
      error: (err) => {
        console.error('Error fetching characters:', err);
      }
    });
  }

  getAllCharacters(): void {
    this.characterService.getAllCharacter().subscribe({
      next: (data) => {
        this.characterListe = data.map(character => character as Character);
      },
      error: (err) => {
        console.error('Error fetching characters:', err);
      }
    });
  }

  onCharacterSelected(): void {
    this.selectedCharacter = this.characterListe.filter(a => a.id == this.formCharacterGroup.get('selectedCharacter')?.value)?.[0];
    if (!this.selectedCharacter) return;

    this.languagesComponent?.setLanguagesData(this.selectedCharacter.languages || []);
    console.log('Selected character:', this.selectedCharacter.classId);

    // Mettre à jour le formulaire avec les données du personnage sélectionné
    this.formCharacter.patchValue({
      formClasses: {
        selectedClasse: this.classesComponent?.getClasses(this.selectedCharacter.classId),
        selectedSubClass: null
      },
      formRaces: {
        selectedRace: this.racesComponent?.getRaces(this.selectedCharacter.raceId),
        selectedSubRace: null
      },
      formHistoriques: {
        selectedHistorique: this.backgroundsComponent?.getBackground(this.selectedCharacter.backgroundId),
        selectedHistoriqueData: null
      },
      detailCharacter: {
        nom: this.selectedCharacter.name,
        alignment: this.selectedCharacter.alignmentId,
        age: this.selectedCharacter.age || '',
        taille: this.selectedCharacter.height || '',
        poids: this.selectedCharacter.weight || '',
        px: this.selectedCharacter.xp || '',
        yeux: this.selectedCharacter.eyes || '',
        peau: this.selectedCharacter.skin || '',
        cheveux: this.selectedCharacter.hair || '',
        apparence: this.selectedCharacter.appearance || '',
        histoire: this.selectedCharacter.backstory || '',
        traits: this.selectedCharacter.traits || '',
        ideaux: this.selectedCharacter.ideals || '',
        liens: this.selectedCharacter.bonds || '',
        defauts: this.selectedCharacter.flaws || '',
        allies: this.selectedCharacter.allies || '',
        capacites: this.selectedCharacter.treasure || '',
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
    return this.formCharacter.get('formDetail') as FormGroup;
  }
  get formCharacterGroup(): FormGroup {
    return this.formCharacter as FormGroup;
  } get formCharacteristicGroup(): FormGroup {
    return this.formCharacter.get('formCaracteristic') as FormGroup;
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

  // Méthode de débogage pour identifier les erreurs de validation
  private getFormValidationErrors(): any[] {
    const formErrors: any[] = [];

    Object.keys(this.formCharacter.controls).forEach(key => {
      const controlErrors = this.formCharacter.get(key)?.errors;
      if (controlErrors) {
        formErrors.push({
          control: key,
          errors: controlErrors
        });
      }

      // Vérifier les sous-groupes
      const control = this.formCharacter.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(subKey => {
          const subControlErrors = control.get(subKey)?.errors;
          if (subControlErrors) {
            formErrors.push({
              control: `${key}.${subKey}`,
              errors: subControlErrors
            });
          }
        });
      }
    });

    return formErrors;
  }

  onSubmit(): void {
    this.validationErrorMessage = '';
    // Vérification de la validité du formulaire
    console.log("formCharacter", this.formCharacter);
    if (!this.formCharacter.valid) {
      console.log('Form is invalid. Errors:', this.getFormValidationErrors());
      this.markFormGroupTouched(this.formCharacter);
      this.showValidationErrors();
      console.log("probleme");
      return;
    }
    
    //Collecte toute les données du formulaire avec les objets complets
    const formData = {
      classId: this.classesComponent?.getClassesId(this.formCharacter.get('formClasses.selectedClasse')?.value),
      raceId: this.racesComponent?.getRacesId(this.formCharacter.get('formRaces.selectedRace')?.value),      
      backgroundId: this.backgroundsComponent?.getBackgroundId(this.formCharacter.get('formHistoriques.selectedHistorique')?.value),   
      languageIds: this.languagesComponent?.chosenLanguages || [],
      alignmentId: this.formCharacter.get('detailCharacter.alignment')?.value,
      userId: 'NotImplemented', // Remplacer par l'ID de l'utilisateur connecté
      xp: 0,
      level: 1,
      name: this.formCharacter.get('detailCharacter.nom')?.value,
      player: 'NotImplemented', // Remplacer par le nom de l'utilisateur connect
      AC: 10, // Valeur par défaut, peut être modifiée plus tard
      speed: 9, // Valeur par défaut, peut être modifiée plus tard
      hp: 14, // Valeur par défaut, peut être modifiée plus tard
      maxHp: 14, // Valeur par défaut, peut être modifiée plus tard
      tempHp: 0, // Valeur par défaut, peut être modifiée plus tard
      personality: this.formCharacter.get('detailCharacter.traits')?.value,
      ideals: this.formCharacter.get('detailCharacter.ideaux')?.value,
      bonds: this.formCharacter.get('detailCharacter.liens')?.value,
      flaws: this.formCharacter.get('detailCharacter.defauts')?.value,
      age: this.formCharacter.get('detailCharacter.age')?.value,
      height: this.formCharacter.get('detailCharacter.taille')?.value,
      weight: this.formCharacter.get('detailCharacter.poids')?.value,
      eyes: this.formCharacter.get('detailCharacter.yeux')?.value,
      skin: this.formCharacter.get('detailCharacter.peau')?.value,
      hair: this.formCharacter.get('detailCharacter.cheveux')?.value,
      appearance: this.formCharacter.get('detailCharacter.apparence')?.value,
      allies: this.formCharacter.get('detailCharacter.allies')?.value,
      backstory: this.formCharacter.get('detailCharacter.histoire')?.value,
      treasure: '', // Valeur par défaut, peut être modifiée plus tard
      traits: this.formCharacter.get('detailCharacter.traits')?.value,
      skillIds: [], // Non implémenté, à remplir plus tard
      abilities: [], // Non implémenté, à remplir plus tard
    };

    this.characterService.addCharacter(formData).subscribe();
  }
}

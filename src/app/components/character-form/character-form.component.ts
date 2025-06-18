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
import { CharacteristicComponent } from './characteristic/characteristic.component';
import {LanguagesComponent} from './languages/languages.component';
import {AlignmentService} from '../../services/alignment/alignment.service';
import {CharacterService} from '../../services/character/character.service';
import {Character} from '../../models/character.model';

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
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.loadAlignmentOptions();
    this.getAllCharacters();
    this.characterListe = [
    {
      id: "1",
      raceId: "1",
      classId: "5",
      backgroundId: "1",
      alignmentId: "1",
      userId: 'user123',

      xp: 1200,
      level: 3,
      name: 'Tharion',
      player: 'Alice',
      AC: 15,
      speed: 30,
      hp: 28,
      maxHp: 28,
      tempHp: 5,
      personality: 'Brave and loyal',
      ideals: 'Justice and honor',
      bonds: 'Sworn to protect his homeland',
      flaws: 'Reckless in battle',
      age: 27,
      height: '6ft',
      weight: '180 lbs',
      eyes: 'Green',
      skin: 'Tan',
      hair: 'Black',
      appearance: 'Wears a worn leather armor with a family crest',
      allies: 'Companions from the Silver Guard',
      backstory: 'Former soldier turned adventurer after his village was attacked.',
      treasure: 'An enchanted sword passed down from his father',
      traits: 'Keen senses, fearless',
      languages: ['1', '2']
    }
  ];
  }

  initForm(): void {
    this.formCharacter = this.formBuilder.group({
      selectedCharacter: new FormControl(null), // Ajout du contrôle manquant
      formClasses: this.formBuilder.group({
        selectedClasse: new FormControl(null, Validators.required),
        selectedSubClass: new FormControl(null)
      }),      
      formRaces: this.formBuilder.group({
        selectedRace: new FormControl(null, Validators.required),
        selectedSubRace: new FormControl(null)
      }),      formHistoriques: this.formBuilder.group({
        selectedHistorique: new FormControl(null, Validators.required),
        selectedHistoriqueData: new FormControl(null)
      }),
      formLanguages: this.formBuilder.group({
        selectedLanguage: new FormControl(null),
        languages: this.formBuilder.array([]) 
      }),
      formCaracteristic: this.formBuilder.group({
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
        equipements: this.formBuilder.array([]), 
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
      formLanguages: {
        selectedLanguage: this.languagesComponent?.getLanguages(this.selectedCharacter.languages),
        languages: [] 
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
  }  get detailCharacter(): FormGroup {
    return this.formCharacter.get('detailCharacter') as FormGroup;
  }
  get formCharacterGroup(): FormGroup {
    return this.formCharacter as FormGroup;
  }
  get formCharacteristicGroup(): FormGroup {
    return this.formCharacter.get('formCharacteristicGroup') as FormGroup;
  }
  get formEquipementGroup(): FormGroup {
    return this.formCharacter.get('formEquipement') as FormGroup;
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

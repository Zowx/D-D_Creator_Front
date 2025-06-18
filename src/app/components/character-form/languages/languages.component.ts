import { Language } from './../../../models/language.model';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { LanguagesService } from '../../../services/languages/languages.service';

@Component({
  selector: 'app-languages',
  imports: [ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './languages.component.html',
  styleUrls: [
    './languages.component.scss',
    '../../../shared/shared-style.scss',
  ],
})
export class LanguagesComponent implements OnInit {
  @Input() formLanguagesGroup!: FormGroup;
  @ViewChildren('languageCheckbox') languageCheckboxes!: QueryList<ElementRef<HTMLInputElement>>;
  languageList: string[] = [];
  languagesData: Language[] = [];
  chosenLanguages: string[] = [];
  selectedLanguagesData: Language[] = [];
  maxLanguages: number = 2;
  constructor(
    private readonly languagesService: LanguagesService
  ) {}

  loadLanguages() {
    this.languagesService.getLanguages().subscribe({
      next: (dataLanguages) => {
        this.languagesData = dataLanguages;
        this.languageList = dataLanguages.map((language) => language.name);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des langues:', err);
      },
    });
  }

  onLanguageChange(event: any, languageName: string) {
    const isChecked = event.target.checked;
    const languageId = this.languagesData.find(
      (language) => language.name === languageName
    )?.id.toString();
    if (!languageId) {
      console.error(`Langue non trouvée: ${languageName}`);
      return;
    }
    if (isChecked) {
      if (this.chosenLanguages.length >= this.maxLanguages) {
        event.target.checked = false;
        alert(
          `Vous ne pouvez choisir que ${this.maxLanguages} langues maximum.`
        );
        return;
      }
      this.chosenLanguages.push(languageId);
    } else {
      this.chosenLanguages = this.chosenLanguages.filter(
        (l) => l !== languageId
      );
    }

    this.updateSelectedLanguagesData();

    this.updateFormControl();
  }

  public setLanguagesData(languages: string[]) {
  this.chosenLanguages = languages;
  this.updateSelectedLanguagesData();
  this.updateFormControl();

  setTimeout(() => {
    this.languageCheckboxes.forEach((checkboxRef) => {
      const input = checkboxRef.nativeElement;
      input.checked = this.selectedLanguagesData.some(lang => lang.name === input.value);
    });
  });
}

  updateSelectedLanguagesData() {
    this.selectedLanguagesData = this.languagesData.filter((language) =>
      this.chosenLanguages.includes(language.id.toString())
    );
  }


  updateFormControl() {
    // Obtenir le FormArray languages
    const languagesFormArray = this.formLanguagesGroup.get(
      'languages'
    ) as FormArray;
    if (languagesFormArray) {
      // Vider le FormArray existant
      while (languagesFormArray.length !== 0) {
        languagesFormArray.removeAt(0);
      }

      // Ajouter les nouvelles langues sélectionnées
      this.chosenLanguages.forEach((languageName) => {
        languagesFormArray.push(new FormControl(languageName));
      });
    }
  }

  isLanguageSelected(languageName: string): boolean {
    return this.chosenLanguages.includes(languageName);
  }
  ngOnInit(): void {
    if (!this.formLanguagesGroup) {
      console.error("formLanguagesGroup n'est pas défini");
      return;
    }

    this.loadLanguages();
  }
  get languages(): FormArray {
    return this.formLanguagesGroup.get('languages') as FormArray;
  }

  get selectedLanguage(): FormControl {
    return this.formLanguagesGroup.get('selectedLanguage') as FormControl;
  }

  onSubmit() {
    console.log('Form submitted!');
  }

  public getLanguages(id: string[]) {
    const language = id.map((langId) =>
      this.languagesData.find((language) => language.id.toString() === langId)
    );
    if (language) {
      return language;
    }
    return '';
  }
}

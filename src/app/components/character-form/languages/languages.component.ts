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
import { LanguagesService } from '../../../services/languages/languages.service';
import { Language } from '../../../models/language.model';

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
  languageList: string[] = [];
  languagesData: Language[] = [];
  chosenLanguages: string[] = [];
  selectedLanguagesData: Language[] = [];
  maxLanguages: number = 2;
  constructor(
    private readonly formBuilder: FormBuilder,
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

    if (isChecked) {
      if (this.chosenLanguages.length >= this.maxLanguages) {
        event.target.checked = false;
        alert(
          `Vous ne pouvez choisir que ${this.maxLanguages} langues maximum.`
        );
        return;
      }
      this.chosenLanguages.push(languageName);
    } else {
      this.chosenLanguages = this.chosenLanguages.filter(
        (l) => l !== languageName
      );
    }

    this.updateSelectedLanguagesData();

    this.updateFormControl();
  }

  updateSelectedLanguagesData() {
    this.selectedLanguagesData = this.languagesData.filter((language) =>
      this.chosenLanguages.includes(language.name)
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

    // Debug pour voir si la mise à jour fonctionne
    console.log('Langues choisies:', this.chosenLanguages);
    console.log('Valeur du FormArray languages:', languagesFormArray?.value);
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
}

import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-languages',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss', '../../../shared/shared-style.scss'],
})
export class LanguagesComponent {
  @Input() formLanguagesGroup!: FormGroup;
  languageList = [];
  chosenLanguage: string[] = [];
  
  constructor(private formBuilder: FormBuilder) {}

  initForm() : void {
    this.formLanguagesGroup = this.formBuilder.group({
      selectedLanguage: new FormControl(null)
    });
  }

  loadLanguages() {
    //TODO
  }
  get languages(): FormArray {  
    return this.formLanguagesGroup.get('formLanguages.languages') as FormArray;
  }
  ngOnInit(): void {
    if (!this.formLanguagesGroup) {
      this.formLanguagesGroup = this.formBuilder.group({
        languages: [[]],
      });
    }
    this.initForm();
    this.loadLanguages();
  }
  
  
  get selectedLanguage(): FormControl {
    return this.formLanguagesGroup.get('selectedLanguage') as FormControl;
  }

  addLanguage(event: any, language: string) {
    console.log('Language selected:', language);
    const isChecked = event.target.checked;
    if(isChecked){
      if(this.chosenLanguage.length >=2) {
        event.target.checked = false;
        alert('Vous ne pouvez choisir que 2 languages.');
        return;
      }
      this.chosenLanguage.push(language);
    } else {
      this.chosenLanguage = this.chosenLanguage.filter(l => l !== language);
    }
    this.formLanguagesGroup.patchValue({
      languages: this.chosenLanguage,
    });
  }
  
  onSubmit() {
    console.log('Form submitted!');
  }
}

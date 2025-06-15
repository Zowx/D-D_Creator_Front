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
  selector: 'app-langues',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './langues.component.html',
  styleUrl: './langues.component.scss'
})
export class LanguesComponent {
  @Input() formLanguesGroup!: FormGroup;
  langueList = ['goblin', 'elfique', 'nain', 'draconique'];
  chosenLangue: string[] = [];
  
  constructor(private fb: FormBuilder) {}


  get langues(): FormArray {  
    return this.formLanguesGroup.get('formLangues.langues') as FormArray;
  }
  ngOnInit(): void {
    if (!this.formLanguesGroup) {
      this.formLanguesGroup = this.fb.group({
        langues: [[]],
      });
    }
  }
  
  
  get selectedLangue(): FormControl {
    return this.formLanguesGroup.get('selectedLangue') as FormControl;
  }

  addLangue(event: any, langue: string) {
    const isChecked = event.target.checked;
    if(isChecked){
      if(this.chosenLangue.length >=2) {
        event.target.checked = false;
        return;
      }
      this.chosenLangue.push(langue);
    } else {
      this.chosenLangue = this.chosenLangue.filter(l => l !== langue);
    }
    this.formLanguesGroup.patchValue({
      langues: this.chosenLangue,
    });
  }
  
  onSubmit() {
    console.log('Form submitted!');
  }
}

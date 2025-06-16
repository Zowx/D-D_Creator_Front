import { Component, Input, OnInit} from '@angular/core';
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
  selector: 'app-classes',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit {
  @Input() formClassesGroup!: FormGroup;
  classList = ['paladin', 'sorcier', 'druide'];
  constructor(
    private readonly formBuilder: FormBuilder
  ) {}

  initForm(): void {
    this.formClassesGroup = this.formBuilder.group({
      selectedClasse: new FormControl(null) 
    });
  }

  get classes(): FormArray {  
    return this.formClassesGroup.get('formClasses.classes') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
  }
  
  get selectedClasse(): FormControl {
    return this.formClassesGroup.get('selectedClasse') as FormControl;
  }
onSubmit() {
  console.log('Form submitted!');
}
}

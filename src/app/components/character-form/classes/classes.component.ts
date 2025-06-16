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
  //classList = ['paladin', 'sorcier', 'druide'];
  classList: string[] = [];
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
        this.classList = dataClasses.map((classe) => classe.name);
        console.log("Les classes", this.classList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get classes(): FormArray {  
    return this.formClassesGroup.get('formClasses.classes') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadClasses();
  }
  
  get selectedClasse(): FormControl {
    return this.formClassesGroup.get('selectedClasse') as FormControl;
  }
onSubmit() {
  console.log('Form submitted!');
}
}

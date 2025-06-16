import { Component,Input } from '@angular/core';
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
import { BackgroundService } from '../../../services/background/background.service';
@Component({
  selector: 'app-backgrounds',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './backgrounds.component.html',
  styleUrls: ['./backgrounds.component.scss', '../../../shared/shared-style.scss'],
})
export class BackgroundsComponent {
  @Input() formBackgroundsGroup!: FormGroup;
  backgroundsList: string[] = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly backgroundsService: BackgroundService
  ) {
  }

  initForm(): void {
    this.formBackgroundsGroup = this.formBuilder.group({
     selectedBackground: new FormControl(null),
    });
  }

  loadBackgrounds(){
    this.backgroundsService.getAllBackgrounds().subscribe({
      next: (dataBackgrounds) => {
        this.backgroundsList = dataBackgrounds.map((background) => background.name);
        console.log("les backgrounds", this.backgroundsList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get backgrounds(): FormArray {  
    return this.formBackgroundsGroup.get('formBackgrounds.backgrounds') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadBackgrounds();
  }

  get selectedBackground(): FormControl {
    return this.formBackgroundsGroup.get('selectedBackground') as FormControl;
  }

  onSubmit() {
    console.log('Form submitted!');
  }
}

import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import {AlignementService} from '../../../../services/alignement/alignement.service';
import { Character } from '../../../../interfaces/character';


@Component({
  selector: 'app-detail-form',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss', '../../../../shared/shared-style.scss'],
})
export class DetailFormComponent {
  @Input() public formDetail!: FormGroup;

  sexeOptions = ['Homme', 'Femme', 'Autre'];
  alignementOptions: string[] = [];
  constructor(
    private readonly formBuilder: FormBuilder
    , private alignementService: AlignementService
  ) {}

  loadAlignements() {
    this.alignementService.getAllAlignements().subscribe({
      next: (dataAlignements) => {
       this.alignementOptions = dataAlignements
       console.log("Les alignements"+this.alignementOptions);
      },
      error: (err) => {
        console.log(err);
      },
    }
    );
  }

  ngOnInit(){
    this.loadAlignements();
  }


  onSubmit() {
    console.log('Form submitted!');
  }
}

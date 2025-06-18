import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import {AlignmentService} from '../../../../services/alignment/alignment.service';
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
  alignmentOptions: string[] = [];
  constructor(
    private readonly formBuilder: FormBuilder
    , private alignmentService: AlignmentService
  ) {}

  loadAlignments() {
    this.alignmentService.getAllAlignments().subscribe({
      next: (dataAlignments) => {
       this.alignmentOptions = dataAlignments
       console.log("Les alignments"+this.alignmentOptions);
      },
      error: (err) => {
        console.log(err);
      },
    }
    );
  }

  ngOnInit(){
    this.loadAlignments();
  }


  onSubmit() {
    console.log('Form submitted!');
  }
}

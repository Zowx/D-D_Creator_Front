import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { NgFor } from '@angular/common';
import { BackgroundService } from '../../../services/background/background.service';
import { Background } from '../../../models/background.model';

@Component({
  selector: 'app-backgrounds',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgFor
  ],
  templateUrl: './backgrounds.component.html',
  styleUrls: [
    './backgrounds.component.scss',
    '../../../shared/shared-style.scss',
  ]
})
export class BackgroundsComponent implements OnInit {
  @Input() formBackgroundsGroup!: FormGroup;
  backgroundsList: string[] = [];
  backgroundsData: Background[] = [];
  selectedBackgroundData: Background | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly backgroundsService: BackgroundService
  ) {}

  loadBackgrounds() {
    this.backgroundsService.getAllBackgrounds().subscribe({
      next: (dataBackgrounds) => {
        this.backgroundsData = dataBackgrounds;
        this.backgroundsList = dataBackgrounds.map((background) => background.name);
      },
      error: (err) => {
        console.error("Erreur lors du chargement des backgrounds:", err);
      },
    });
  }
  onBackgroundSelected(backgroundName: string) {
    this.selectedBackgroundData = this.backgroundsData.find(bg => bg.name === backgroundName) || null;
    
    // Mettre a jour le FormCcontrol avec les donnees completes du background
    const selectedBackgroundDataControl = this.formBackgroundsGroup.get('selectedHistoriqueData');
    if (selectedBackgroundDataControl) {
      selectedBackgroundDataControl.setValue(this.selectedBackgroundData);
    }
  }

  ngOnInit(): void {
    // Verifier que le formGroup est bien defini
    if (!this.formBackgroundsGroup) {
      console.error('formBackgroundsGroup n\'est pas défini');
      return;
    }

    // Charger les donnees nécessaires
    this.loadBackgrounds();
    
    
    const selectedBackgroundControl = this.formBackgroundsGroup.get('selectedHistorique');
    if (selectedBackgroundControl) {
      selectedBackgroundControl.valueChanges.subscribe(selectedBackgroundName => {
        if (selectedBackgroundName) {
          this.onBackgroundSelected(selectedBackgroundName);
        }
      });
    }
  }

  get selectedBackground(): FormControl {
    return this.formBackgroundsGroup.get('selectedHistorique') as FormControl;
  }

  onSubmit() {
    console.log('Form submitted!');
  }
}

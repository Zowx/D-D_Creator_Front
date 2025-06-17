import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Trait } from '../../../models/traits.model';
import { TraitsService } from '../../../services/traits/traits.service';
import { Race } from '../../../models/race.model';
import { RacesService } from '../../../services/races/races.service';

interface Characteristic {
  name: string;
  description: string;
  shortDescription: string;
  value: number;
  racialBonus?: number;
}

@Component({
  selector: 'app-characteristic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.scss'],
})
export class CharacteristicComponent implements OnInit {
  @Input() formCharacteristicsGroup!: FormGroup;
  @Input() selectedRace?: string;
  readonly MIN_VALUE = 8;
  readonly MAX_VALUE = 15;
  readonly TOTAL_POINTS = 27;

  characteristics: Characteristic[] = [];
  raceBonuses: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private traitsService: TraitsService,
    private racesService: RacesService
  ) {}

  ngOnInit(): void {
    this.loadTraits();
    if (this.selectedRace) {
      this.loadRaceBonuses(this.selectedRace);
    }
  }

  ngOnChanges(): void {
    if (this.selectedRace) {
      this.loadRaceBonuses(this.selectedRace);
    }
  }

  loadTraits(): void {
    this.traitsService.getTraitsByName('Ability Score Increase').subscribe({
      next: (dataTraits) => {
        this.characteristics = dataTraits.map((trait) => ({
          name: trait.name,
          description: trait.description,
          shortDescription: trait.shortDescription,
          value: this.MIN_VALUE, // valeur initiale par défaut
          racialBonus: 0
        }));
      },
      error: (err) => {
        console.error('Error loading traits:', err);
      },
    });
  }

  loadRaceBonuses(raceName: string): void {
    this.racesService.getRaces().subscribe({
      next: (races: Race[]) => {
        const race = races.find(r => r.name === raceName);
      },
      error: (err) => {
        console.error('Error loading race info:', err);
        this.raceBonuses = '';
      }
    });
  }

  get totalPointsUsed(): number {
    return this.characteristics.reduce((acc, char) => acc + this.getPointCost(char.value), 0);
  }

  getPointCost(value: number): number {
    const costMap: { [key: number]: number } = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
    return costMap[value] ?? 0;
  }

  modifier(value: number): number {
    return Math.floor((value - 10) / 2);
  }

  canIncrease(char: Characteristic): boolean {
    return char.value < this.MAX_VALUE &&
      (this.totalPointsUsed + this.getPointCost(char.value + 1) - this.getPointCost(char.value)) <= this.TOTAL_POINTS;
  }

  increase(char: Characteristic): void {
    if (this.canIncrease(char)) char.value++;
  }

  decrease(char: Characteristic): void {
    if (char.value > this.MIN_VALUE) char.value--;
  }

  saveCharacteristics(): void {
    const finalStats = this.characteristics.map(char => ({
      name: char.name,
      value: char.value + (char.racialBonus || 0),
      modifier: this.modifier(char.value + (char.racialBonus || 0))
    }));
    console.log(finalStats);
  }

  trackByName(index: number, char: Characteristic) {
    return char.name;
  }
}

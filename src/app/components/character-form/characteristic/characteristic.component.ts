import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Ability } from '../../../models/ability.model';
import { AbilityService } from '../../../services/ability/ability.service';

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
  styleUrls: ['./characteristic.component.scss', '../../../shared/shared-style.scss'],
})
export class CharacteristicComponent implements OnInit {
  @Input() formCharacteristicGroup!: FormGroup;
  readonly MIN_VALUE = 8;
  readonly MAX_VALUE = 15;
  readonly TOTAL_POINTS = 27;

  characteristics: Characteristic[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private abilityService: AbilityService
  ) {}

  ngOnInit(): void {
    if (!this.formCharacteristicGroup) {
      this.formCharacteristicGroup = this.formBuilder.group({
        abilities: [[]],
      });
    }
    this.loadAbilities();
  }

  loadAbilities(): void {
    this.abilityService.getAbilities().subscribe({
      next: (abilities: Ability[]) => {
        this.characteristics = abilities.map((ability) => ({
          name: ability.name,
          description: ability.description,
          shortDescription: ability.short_desc,
          value: this.MIN_VALUE,
          racialBonus: 0
        }));
      },
      error: (err: any) => {
        console.error('Error loading abilities:', err);
      },
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

  trackByName(index: number, char: Characteristic) {
    return char.name;
  }
}

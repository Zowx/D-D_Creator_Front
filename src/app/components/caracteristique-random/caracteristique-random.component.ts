import { Component, Input, Output } from '@angular/core';
import { BtnRandomStatComponent } from '../btn-random-stat/btn-random-stat.component';
import { DataStatDropComponent } from '../data-stat-drop/data-stat-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'caracteristique-random',
  standalone: true,
  imports: [BtnRandomStatComponent, DataStatDropComponent, DragDropModule],
  templateUrl: './caracteristique-random.component.html',
  styleUrl: './caracteristique-random.component.scss',
})
export class CaracteristiqueRandomComponent {
  listStatCara: number[] = [];

  statBonusFinalCara: number[] = [];

  @Output() statSelectedRandom = new EventEmitter<number[]>();

  @Output() statBonusSelectedRandom = new EventEmitter<number[]>();

  @Output() finish = new EventEmitter<boolean>();

  @Input() stat: number[] = [];

  @Input() statBonus: number[] = [];

  constructor() {}

  ngOnInit() {}

  updateStat(stat: number[]) {
    console.log('Statistiques reçues:', stat);
    this.listStatCara = stat;
    this.statSelectedRandom.emit(this.listStatCara);
  }

  updateStatBonus(statBonus: number[]) {
    console.log('Statistiques bonus reçues:', statBonus);
    this.statBonusFinalCara = statBonus;
    this.statBonusSelectedRandom.emit(this.statBonusFinalCara);
  }

  handleStatFinalAdditionnalPointsRandom(event: any) {
    console.log('Statistiques bonus reçues dans le handle', event);
    this.updateStatBonus(event as number[]);
  }

  validate() {
    console.log('Statistiques validées:', this.listStatCara);
    console.log('Statistiques bonus validées:', this.statBonusFinalCara);
    this.finish.emit(true);
    this.statSelectedRandom.emit(this.listStatCara);
    this.statBonusSelectedRandom.emit(this.statBonusFinalCara);
  }
}

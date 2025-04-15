import { Component, Input, Output } from '@angular/core';
import { PtsStatComponent } from '../pts-stat/pts-stat.component';
import { BtnRandomStatComponent } from '../btn-random-stat/btn-random-stat.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'caracteristique',
  standalone: true,
  imports: [PtsStatComponent, BtnRandomStatComponent],
  templateUrl: './caracteristique.component.html',
  styleUrl: './caracteristique.component.scss',
})
export class CaracteristiqueComponent {
  selectedStat?: number = 10;

  @Input() stat: number[] = [];

  @Input() statBonus: number[] = [];

  @Output() statSelected = new EventEmitter<number[]>();

  @Output() statBonusAdd = new EventEmitter<number[]>();

  @Output() finish = new EventEmitter<boolean>();

  statFinal: number[] = [10, 10, 10, 10, 10, 10];

  statBonusFinal: number[] = [];

  totalPoints = 12;


  ngOnInit() {}

  updateTotalPoints(points: number) {
    this.totalPoints = points;
  }

  updateStatValue(statFinalSelect: number, typeStat: string) {
    console.log('statFinal', statFinalSelect);
    if (typeStat == 'force') {
      this.statFinal[0] = statFinalSelect;
    } else if (typeStat == 'dexterite') {
      this.statFinal[1] = statFinalSelect;
    } else if (typeStat == 'constitution') {
      this.statFinal[2] = statFinalSelect;
    } else if (typeStat == 'intelligence') {
      this.statFinal[3] = statFinalSelect;
    } else if (typeStat == 'sagesse') {
      this.statFinal[4] = statFinalSelect;
    } else if (typeStat == 'charisme') {
      this.statFinal[5] = statFinalSelect;
    }
    console.log('statFinal', this.statFinal);
  }

  updateStatBonusValue(statBonusFinalSelect: number, typeStat: string) {
    console.log('statBonusFinal', statBonusFinalSelect);
    if (typeStat == 'force') {
      this.statBonusFinal[0] = statBonusFinalSelect;
    } else if (typeStat == 'dexterite') {
      this.statBonusFinal[1] = statBonusFinalSelect;
    } else if (typeStat == 'constitution') {
      this.statBonusFinal[2] = statBonusFinalSelect;
    } else if (typeStat == 'intelligence') {
      this.statBonusFinal[3] = statBonusFinalSelect;
    } else if (typeStat == 'sagesse') {
      this.statBonusFinal[4] = statBonusFinalSelect;
    } else if (typeStat == 'charisme') {
      this.statBonusFinal[5] = statBonusFinalSelect;
    }
    console.log('statBonusFinal', this.statBonusFinal);
  }



  validate() {
    console.log('validate');
    this.statSelected.emit(this.statFinal);
    this.statBonusAdd.emit(this.statBonusFinal);
    console.log("finish", this.finish);
    this.finish.emit(true);
  }
}

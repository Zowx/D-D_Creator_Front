import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pts-stat',
  standalone: true,
  imports: [],
  templateUrl: './pts-stat.component.html',
  styleUrl: './pts-stat.component.scss',
})
export class PtsStatComponent {
  @Input() statName: string = '';

  @Input() pointDispo!: number;

  @Output() pointDispoChange = new EventEmitter<number>();

  @Output() statValueChange = new EventEmitter<number>();

  @Output() statFinalAdditionnalPoints = new EventEmitter<number>();


  statValue = 10;

  statFinalPoints = 10;

  additionnalPoints = 0;

  constructor() {}

  ngOnInit() {}
  // typeStat: string
  addPoints() {
    if (this.pointDispo >= 0 && this.pointDispo < 27) {
      if (this.statValue < 15) {
        this.statValue++;
        this.statFinalPoints++;
        if (this.statValue > 13) {
          this.pointDispo += 2;
        } else if (this.statValue >= 9 && this.statValue <= 13) {
          this.pointDispo++;
        }
        this.pointDispoChange.emit(this.pointDispo);

        this.statValueChange.emit(this.statValue);
        if (this.statValue % 2 === 0) {
          this.additionnalPoints++;
          this.statFinalAdditionnalPoints.emit(this.additionnalPoints);
        }
      }
    }
  }

  removePoints() {
    if (this.pointDispo >= 0) {
      if (this.statValue > 3) {
        this.statValue--;
        this.statFinalPoints--;
        if (this.statValue > 7 && this.statValue < 13) {
          this.pointDispo--;
        } else if (this.statValue >= 13) {
          this.pointDispo -= 2;
        }
        this.pointDispoChange.emit(this.pointDispo);
        this.statValueChange.emit(this.statValue);

        if (this.statValue % 2 === 1) {
          this.additionnalPoints--;
          this.statFinalAdditionnalPoints.emit(this.additionnalPoints);
        }
      }
    }
  }


  
}

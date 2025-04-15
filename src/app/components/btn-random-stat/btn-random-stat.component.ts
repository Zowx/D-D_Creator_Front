import { Component, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'random-stat',
  standalone: true,
  imports: [NgIf],
  templateUrl: './btn-random-stat.component.html',
  styleUrl: './btn-random-stat.component.scss',
})
export class BtnRandomStatComponent {
  totalPoints: number = 27;
  stat: number[] = [];
  BTNVisible = true;
  additionnalPoints: number[] = [];

  @Output() statChange = new EventEmitter<number[]>();

  @Output() statFinalAdditionnalPointsRandom = new EventEmitter<number[]>();

  randomStat() {
    this.stat = [];
    this.totalPoints = 0;
    // Générer les statistiques initiales
    for (let i = 0; i < 6; i++) {
      const rolls = [];

      // Lancer 4 dés à 6 faces
      for (let j = 0; j < 4; j++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
      }

      // Trier les résultats en ordre décroissant
      rolls.sort((a, b) => b - a);

      // Conserver les 3 meilleurs résultats
      const bestThree = rolls.slice(0, 3);

      // Ajouter la somme des meilleurs résultats à la liste
      const statValue = bestThree.reduce((acc, value) => acc + value, 0);
      this.stat.push(statValue);

      let bonusPoints = 0;
      if (statValue > 10) {
        if (statValue % 2 === 0) {
          bonusPoints = Math.floor((statValue - 10) / 2);
        } else {
          bonusPoints = Math.floor((statValue - 1 - 10) / 2);
        }
      } else if (statValue < 10) {
        bonusPoints = -Math.floor((10 - statValue) / 2);
      }

      this.additionnalPoints.push(bonusPoints);
      console.log('this.additionnalPoints', this.additionnalPoints);
      this.statFinalAdditionnalPointsRandom.emit(this.additionnalPoints);

      this.statChange.emit(this.stat);
    }

    console.log('Liste de nombres après correction:', this.stat);
    console.log('liste de points additionnels:', this.additionnalPoints);
    // Mettez à jour vos émetteurs d'événements ici avec les valeurs correctes si nécessaire
    this.BTNVisible = false;
  }
}

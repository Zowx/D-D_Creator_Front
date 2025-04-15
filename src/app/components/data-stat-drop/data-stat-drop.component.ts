import { Component, Input, Output, ViewChild } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'data-stat-drop',
  standalone: true,
  imports: [DragDropModule, CommonModule],
  templateUrl: './data-stat-drop.component.html',
  styleUrl: './data-stat-drop.component.scss',
})
export class DataStatDropComponent {
  @Input() set listeStat(value: number[]) {
    this._listeStat = value;
    this.listeStatInitiale = [...value];
  }

  @Input() set listeStatBonus(value: number[]) {
    this._listeStatBonus = value;
    this.listeStatBonusInitiale = [...value];
  }

  @Output() statSelectedRandom = new EventEmitter<number[]>();

  @Output() statBonusSelectedRandom = new EventEmitter<number[]>();

  listeStatFinal: number[] = [10, 10, 10, 10, 10, 10];

  get listeStat(): number[] {
    return this._listeStat;
  }

  get listeStatBonus(): number[] {
    return this._listeStatBonus;
  }

  private _listeStatBonus: number[] = [];
  private _listeStat: number[] = [];
  public listeStatInitiale: number[] = [];
  public listeStatBonusInitiale: number[] = [];

  force: number | null = null;
  dexterite: number | null = null;
  constitution: number | null = null;
  intelligence: number | null = null;
  sagesse: number | null = null;
  charisme: number | null = null;

  listeStatMemoire: number[] = [];

  onIgnite() {
    this.validate();
  }

  drop(event: CdkDragDrop<number[]>, targetContainer: string) {
    console.log('listeStatBonus', this.listeStatBonus);

    const item = event.previousContainer.data[event.previousIndex];
    const bonusItem = this.listeStatBonus[event.previousIndex];
    if (event.container.data.length === 0) {
      event.container.data = [];
      console.log('item', item);
      // Supprimer l'élément de la liste d'origine en conservant les doublons
      console.log(event.container.data.length);

      const index = this.listeStat.findIndex((stat) => stat === item);
      if (index > -1) {
        this.listeStatMemoire.push(item);
        this.listeStat.splice(index, 1);
        this.listeStatBonus.splice(index, 1);
      }
      // Insérer l'élément dans le conteneur cible à la position spécifiée
      event.container.data.splice(event.currentIndex, 0, item);

      // Mettre à jour la statistique cible
      this.updateTargetStat(item, bonusItem, targetContainer);
      if (this.listeStat.length === 0) {
        this.validate();
      }
    } else {
      console.log(
        "Le conteneur cible n'est pas vide. Impossible d'ajouter un nouvel élément."
      );
    }
  }

  private updateTargetStat(
    stat: number,
    bonus: number,
    targetContainer: string
  ) {
    switch (targetContainer) {
      case 'force':
        this.force = stat;
        this.listeStatFinal[0] = stat;
        this.listeStatBonusInitiale[0] = bonus;
        break;
      case 'dexterite':
        this.dexterite = stat;
        this.listeStatFinal[1] = stat;
        this.listeStatBonusInitiale[1] = bonus;
        break;
      case 'constitution':
        this.constitution = stat;
        this.listeStatFinal[2] = stat;
        this.listeStatBonusInitiale[2] = bonus;
        break;
      case 'intelligence':
        this.intelligence = stat;
        this.listeStatFinal[3] = stat;
        this.listeStatBonusInitiale[3] = bonus;
        break;
      case 'sagesse':
        this.sagesse = stat;
        this.listeStatFinal[4] = stat;
        this.listeStatBonusInitiale[4] = bonus;
        break;
      case 'charisme':
        this.charisme = stat;
        this.listeStatFinal[5] = stat;
        this.listeStatBonusInitiale[5] = bonus;
        break;
      default:
        break;
    }
  }

  resetPlacement() {
    // Remettre à zéro toutes les statistiques cibles
    this.force = null;
    this.dexterite = null;
    this.constitution = null;
    this.intelligence = null;
    this.sagesse = null;
    this.charisme = null;
    this.listeStatFinal = [0, 0, 0, 0, 0, 0];
    // Réinitialiser la liste d'origine avec les valeurs initiales
    this.listeStat = [...this.listeStatInitiale];
    this.listeStatMemoire = [];
  }

  validate() {
    console.log('validate');
    console.log('listeBonus', this.listeStatBonus);
    this.statSelectedRandom.emit(this.listeStatFinal);
    this.statBonusSelectedRandom.emit(this.listeStatBonusInitiale);
  }
}

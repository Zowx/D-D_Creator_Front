import { Component, Input } from '@angular/core';
import { ClassesComponent } from '../classes/classes.component';
import { RacesComponent } from '../races/races.component';
import { HistoriqueComponent } from '../historique/historique.component';
import { CaracteristiqueComponent } from '../caracteristique/caracteristique.component';
import { CaracteristiqueRandomComponent } from '../caracteristique-random/caracteristique-random.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { AlignementComponent } from '../alignement/alignement.component';
import { NomDuPersoComponent } from '../nom-du-perso/nom-du-perso.component';
import { NomDuJoueurComponent } from '../nom-du-joueur/nom-du-joueur.component';

@Component({
  selector: 'form-perso',
  standalone: true,
  imports: [
    ClassesComponent,
    RacesComponent,
    HistoriqueComponent,
    CaracteristiqueComponent,
    CaracteristiqueRandomComponent,
    NgIf,
    DragDropModule,
    AlignementComponent,
    NomDuPersoComponent,
    NomDuJoueurComponent,
  ],
  templateUrl: './form-perso.component.html',
  styleUrl: './form-perso.component.scss',
})
export class FormPersoComponent {
  perso = {
    namePerso: 'testnomperso',
    nameUser: 'testnomuser',
    alignement: 'Neutre',
    race: 'testrace',
    classe: 'testclasse',
    historique: 'testhistorique',
    stat: [10, 10, 10, 10, 10, 10],
    statBonus: [2, 2, 2, 2, 2, 2],
  };

  @Input() finish: boolean = false;

  creation = true;
  infoDeBaseVisible = true;
  raceVisible = false;
  classeVisible = false;
  historiqueVisible = false;
  statVisible = false;
  statRandomVisible = false;
  statFinish = false;
  btnfinishVisible = false;

  onClasseSelected(classe: string) {
    console.log(classe);
    this.perso.classe = classe;
  }

  onRaceSelected(race: string) {
    this.perso.race = race;
  }

  onHistoriqueSelected(historique: string) {
    console.log(historique);
    this.perso.historique = historique;
  }

  onStatSelected(stat: number[]) {
    console.log('stat de form', stat);
    this.perso.stat = stat;
  }

  onStatBonusAdd(statBonus: number[]) {
    console.log('statBonus de form', statBonus);
    this.perso.statBonus = statBonus;
  }

  onStatSelectedRandom(stat: number[]) {
    console.log('stat de form', stat);
    this.perso.stat = stat;
  }

  onAlignementSelected(alignement: string) {
    console.log(alignement);
    this.perso.alignement = alignement;
  }

  onNameSelected(namePerso: string) {
    console.log(namePerso);
    this.perso.namePerso = namePerso;
  }

  onNameUserSelected(nameUser: string) {
    console.log(nameUser);
    this.perso.nameUser = nameUser;
  }

  toggleVisibilityBaseRace() {
    this.infoDeBaseVisible = false;
    this.raceVisible = true;
  }

  toggleVisibilityRaceClasse() {
    this.raceVisible = false;
    this.classeVisible = true;
  }

  toggleVisibilityClasseHistorique() {
    this.classeVisible = false;
    this.historiqueVisible = true;
  }

  toggleVisibilityHistoriqueStat() {
    this.historiqueVisible = false;
    this.statVisible = true;
  }

  toggleVisibilityStatStatRandom() {
    this.statVisible = false;
    this.statRandomVisible = true;
  }

  toggleVisibilityStatRandomStat() {
    this.statRandomVisible = false;
    this.statVisible = true;
  }


  convertFinish(event: any) {
    if (typeof event === 'boolean') {
      this.finish = event;
      this.toggleVisibilityBtnFinish();
    }
  }

  toggleVisibilityBtnFinish() {
    if(this.finish){
      this.btnfinishVisible = true;
    }
  }

  toggleVisibilityStatFinish() {
    this.statFinish = true;
    this.creation = false;
    this.statRandomVisible = false;
    this.statVisible = false;
  }

}

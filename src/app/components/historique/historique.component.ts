import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RecupHistoriqueService } from '../../services/recup-historique.service';
import { IHistorique } from '../../interfaces/ihistorique';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';


@Component({
  selector: 'historique',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.scss'
})
export class HistoriqueComponent {
  resultHistorique: IHistorique[] = [];
  selectedHistorique: string = '';
  hoveredHistorique: any = null;

  @Input() historique: string[] = [];

  @Output() selectItem = new EventEmitter<string>();

  constructor(private recupHistoriqueService: RecupHistoriqueService) {}

  ngOnInit() {
    this.loadHistorique();
  }

  loadHistorique() {
    this.recupHistoriqueService.getAllHistorique().subscribe({
      next: (dataHistorique) => {
        this.resultHistorique = dataHistorique;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  choiceHistorique(historique: any, name: string) {
    if (!historique?.target?.innerText) return;
    this.selectItem.emit(name);
    this.selectedHistorique = name;
  }

}

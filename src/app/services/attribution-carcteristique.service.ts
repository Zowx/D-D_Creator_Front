import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttributionCarcteristiqueService {
  private selectedStats: number[] = [];
  private selectedStatFinal?: number | null;

  addSelectedStat(stat: number) {
    this.selectedStats.push(stat);
  }

  getSelectedStatFinal() {
    return this.selectedStatFinal;
  }

  setStatFinal(stat: number) {
    this.selectedStatFinal = stat;
  }

  clearSelectedStats() {
    this.selectedStats = [];
    this.selectedStatFinal = null;
  }
}

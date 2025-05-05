import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectionOption {
  id: string;
  label: string;
  description?: string;
  selected?: boolean;
  imageUrl?: string;
}

@Component({
  selector: 'app-selection-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selection-grid.component.html',
  styleUrl: './selection-grid.component.scss',
})
export class SelectionGridComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() options: SelectionOption[] = [];
  @Input() selectedOptionId: string | null = null;
  @Input() multiSelect: boolean = false;

  @Output() selectionChange = new EventEmitter<string | string[]>();

  constructor() {}

  ngOnInit(): void {
    // Si une option est déjà sélectionnée, marquer-la comme sélectionnée
    if (this.selectedOptionId && !this.multiSelect) {
      const selectedOption = this.options.find(
        (option) => option.id === this.selectedOptionId
      );
      if (selectedOption) {
        selectedOption.selected = true;
      }
    }
  }

  onSelect(option: SelectionOption): void {
    if (this.multiSelect) {
      option.selected = !option.selected;
      const selectedIds = this.options
        .filter((opt) => opt.selected)
        .map((opt) => opt.id);
      this.selectionChange.emit(selectedIds);
    } else {
      this.options.forEach((opt) => (opt.selected = false));
      option.selected = true;
      this.selectedOptionId = option.id;
      this.selectionChange.emit(option.id);
    }
  }

  isSelected(option: SelectionOption): boolean {
    return option.selected || option.id === this.selectedOptionId;
  }
}

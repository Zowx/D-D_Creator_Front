import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecupClasseService } from '../../services/recup-classe.service';
import { Iclasses } from '../../interfaces/iclasses';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'classes',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class ClassesComponent {
  resultClasse: Iclasses[] = [];
  selectedClasse: string = '';
  hoveredClasse: any = null;

  @Input() classe: string[] = [];

  @Output() selectItem = new EventEmitter<string>();

  constructor(private recupClasseService: RecupClasseService) {}
  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.recupClasseService.getAllClasses().subscribe({
      next: (dataclasse) => {
        this.resultClasse = dataclasse;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  choiceClasse(classe: any, name: string) {
    if (!classe?.target?.innerText) return;
    this.selectItem.emit(name);
    this.selectedClasse = name;
  }
}

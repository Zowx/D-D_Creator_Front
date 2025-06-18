import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from "@angular/material/dialog";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../shared/shared-style.scss'],
})
export class HomeComponent {
  // Logic for the Home page can be added here
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogData);
  }
}

@Component({
  selector: 'dialog-data',
  templateUrl: './dialog-data.component.html',
  imports: [MatDialogTitle, MatDialogContent],
})
export class DialogData {}
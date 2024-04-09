import { Component } from '@angular/core';
import { SharedLibreriasModule } from '../../../modules/shared.module';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [SharedLibreriasModule, CommonModule],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {
  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>) {}

  close() {
    this.dialogRef.close(false)
  }
}

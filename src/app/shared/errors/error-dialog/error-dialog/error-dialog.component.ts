import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogService } from '../../error-dialog.service';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {

  constructor(
    private errorDialogService: ErrorDialogService,
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string; status?: number }
  ) {}

  close() {
      this.errorDialogService.closeDialog();
  }
}

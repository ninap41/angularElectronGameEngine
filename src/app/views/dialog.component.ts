import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-dialog",
  template: /*html*/ `<h1 mat-dialog-title>
      {{ title }}
    </h1>

    <div mat-dialog-content>
      <p>{{ message }}</p>
    </div>

    <div mat-dialog-actions>
      <button mat-button (click)="onDismiss()">No</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">
        Yes
      </button>
    </div>`,
})
export class DialogComponent implements OnInit {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
  }
  ngOnInit(): void {}

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {
  constructor(public title: string, public message: string) {}
}

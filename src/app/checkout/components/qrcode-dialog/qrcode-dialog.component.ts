import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrl: './qrcode-dialog.component.scss'
})
export class QrcodeDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<QrcodeDialogComponent>
  ) { }

  confirmPayment(){
    this.dialogRef.close(true);
  }

  closeDialog(){
    this.dialogRef.close(false);
  }
}

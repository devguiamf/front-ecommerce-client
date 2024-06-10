import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarNotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  openErrorSnackBar(msg: string) {
    this._snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'error-snackbar',

    });
  }

  openSuccessSnackBar(msg: string) {
    this._snackBar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'sucess-snackbar'
    });
  }
}

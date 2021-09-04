import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {
  constructor(private _snackBar: MatSnackBar) { }

  successMessage(message: string, type: string) {
    this._snackBar.open(message, 'Ok', {
      panelClass: type+'-message'
    });
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';

const DEFAULT_SNACKBAR = CustomSnackbarComponent;

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  public openErrorSnackbar(
    message: string,
    action: string,
    component = DEFAULT_SNACKBAR
  ): void {
    this._snackBar.openFromComponent(component, {
      duration: 5000,
      data: {
        message,
        action,
      },
      panelClass: 'error-snackbar',
    });
  }

  public openSuccessSnackBar(
    message: string,
    action: string,
    component = DEFAULT_SNACKBAR
  ): void {
    this._snackBar.openFromComponent(component, {
      duration: 5000,
      data: {
        message,
        action,
      },
      panelClass: 'success-snackbar',
    });
  }
}

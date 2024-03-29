import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss',
})
export class CustomSnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; action: string }
  ) {}
}

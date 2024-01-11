import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import moment from 'moment';
import momentTz from 'moment-timezone';
import { of, delay } from 'rxjs';
import { CustomSnackbarComponent } from '../../../snackbars/error-snackbar/error-snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMMM, YYYY',
  },
  display: {
    dateInput: 'DD MMMM, YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-room-reservation',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  templateUrl: './room-reservation.component.html',
  styleUrl: './room-reservation.component.scss',
})
export class RoomReservationComponent {
  minStartDate: Date = new Date();
  maxStartDate: Date = new Date();
  minEndDate: Date = new Date();
  maxEndDate: Date = new Date();
  datePlaceholder: string = MY_FORMATS.parse.dateInput;

  messageMaxLength = 500;

  reservationForm = new FormGroup({
    startDate: new FormControl(momentTz.tz('Europe/Paris'), [
      Validators.required,
    ]),
    endDate: new FormControl(momentTz.tz('Europe/Paris'), [
      Validators.required,
    ]),
    hasChildren: new FormControl(false, [Validators.required]),
    hasPets: new FormControl(false, [Validators.required]),
    message: new FormControl('', [Validators.maxLength(this.messageMaxLength)]),
  });

  loadingSubmit: boolean = false;

  constructor(
    private translate: TranslateService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Setup start date input
    const currentMonth: number = new Date().getMonth();
    this.maxStartDate.setMonth(currentMonth + 1);
    this.maxEndDate.setMonth(currentMonth + 1);
  }

  submitForm(): void {
    if (!this.reservationForm.valid) {
      return;
    }
    this.loadingSubmit = true;
    of('reponse')
      .pipe(delay(2000))
      .subscribe((data) => {
        this.loadingSubmit = false;
        this.openSnackBar(
          this.translate.instant('SNACKBARS.RESERVATION_FULL'),
          this.translate.instant('SHARED.OK')
        );
      });
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 5000,
      data: {
        message,
        action,
      },
      panelClass: 'error-snackbar',
    });
  }
}

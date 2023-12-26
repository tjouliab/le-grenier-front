import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import moment, { Moment } from 'moment';
import momentTz from 'moment-timezone';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TimeDropdownComponent } from '../../../time-dropdown/time-dropdown.component';
import { delay, of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorSnackbarComponent } from '../../../snackbars/error-snackbar/error-snackbar.component';

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
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    NgxMaterialTimepickerModule,
    TimeDropdownComponent,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
  minDate: Date = new Date();
  maxDate: Date = new Date();
  datePlaceholder: string = MY_FORMATS.parse.dateInput;

  InputTimeMinMax = {
    MIN: moment.utc().set({
      hour: 18,
      minute: 0,
    }),
    MAX: moment.utc().set({
      hour: 22,
      minute: 30,
    }),
  };
  minutesGap: number = 15;
  required = true;

  InputPersonMinMax = {
    MIN: 1,
    MAX: 8,
  };
  personNumberPlaceholder: string;

  messageMaxLength: number = 150;

  reservationForm = new FormGroup({
    date: new FormControl(momentTz.tz('Europe/Paris'), [Validators.required]),
    time: new FormControl(moment.utc(), [Validators.required]),
    personNumber: new FormControl('', [
      Validators.required,
      Validators.min(this.InputPersonMinMax.MIN),
      Validators.max(this.InputPersonMinMax.MAX),
    ]),
    message: new FormControl('', [Validators.maxLength(this.messageMaxLength)]),
  });

  loadingSubmit: boolean = false;

  constructor(
    private translate: TranslateService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.openSnackBar('Désolé, nous sommes complets à cette date', 'OK');
    // Setup date input
    const currentMonth: number = new Date().getMonth();
    this.maxDate.setMonth(currentMonth + 1);

    // Setup person number input
    this.personNumberPlaceholder = this.translate.instant(
      'RESTAURATION.RESERVATION.PERSON_INTERVAL',
      {
        min: this.InputPersonMinMax.MIN,
        max: this.InputPersonMinMax.MAX,
      }
    );
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
        this.openSnackBar('Nous sommes complets à cette date', 'OK');
      });
  }

  updateFormTime($event: Moment) {
    if ($event) {
      this.reservationForm.patchValue({ time: $event });
    }
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.openFromComponent(ErrorSnackbarComponent, {
      duration: 500000000,
      data: {
        message,
        action,
      },
      panelClass: 'error-snackbar',
    });
  }
}

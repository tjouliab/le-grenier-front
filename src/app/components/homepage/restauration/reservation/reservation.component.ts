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
import { CustomSnackbarComponent } from '../../../snackbars/custom-snackbar/custom-snackbar.component';

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
    MIN: moment().set({
      hour: 18,
      minute: 0,
    }),
    MAX: moment().set({
      hour: 22,
      minute: 35,
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
    date: new FormControl(moment(), [Validators.required]),
    time: new FormControl(moment(), [Validators.required]),
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
    this.setupTimeInput();

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

  setupTimeInput(): void {
    const minTimeDate = moment().set({
      hour: 18,
      minute: 0,
    });
    const maxTimeDate = moment().set({
      hour: 22,
      minute: 30,
    });

    // Add one hour to current date
    const addOneHourDate: moment.Moment = moment().add(1, 'hours');
    if (addOneHourDate.isSameOrAfter(maxTimeDate)) {
      // Consider the day is over, add one day to all dates
      const currentDay: number = new Date().getDate();

      this.minDate.setDate(currentDay + 1);
      this.maxDate.setDate(currentDay + 1);
      this.reservationForm.value.date.add(1, 'days');
    } else if (addOneHourDate.isSameOrAfter(minTimeDate)) {
      // Customers can make a reservation max 1h before
      minTimeDate.set({
        hour: addOneHourDate.hour(),
        minute: this.approximateToUpperQuarter(addOneHourDate.minutes()),
      });
      this.InputTimeMinMax.MIN = minTimeDate;
    }
  }

  private approximateToUpperQuarter(minutes: number): number {
    return Math.floor(minutes / 15 + 1) * 15;
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

  updateFormTime($event: Moment) {
    if ($event) {
      this.reservationForm.patchValue({ time: $event });
    }
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

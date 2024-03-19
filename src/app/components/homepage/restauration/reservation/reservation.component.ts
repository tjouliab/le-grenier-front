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
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import moment from 'moment';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TimeDropdownComponent } from '../../../time-dropdown/time-dropdown.component';
import { delay, of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../../snackbars/custom-snackbar/custom-snackbar.component';
import { CLOSING_HOUR, OPENING_HOUR } from '../../../../../environment';

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
    MIN: moment().startOf('day'),
    MAX: moment().endOf('day').subtract(1, 'minute'),
    DisableUnder: null,
  };
  minutesGap: number = 15;

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
    private _snackBar: MatSnackBar,
    private _adapter: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.setupLocalDateFormat();

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

  private setupLocalDateFormat(): void {
    this._adapter.setLocale(this.translate.currentLang);
    this.translate.onLangChange.subscribe({
      next: (event: { lang: string }) => {
        this._adapter.setLocale(event.lang);
      },
    });
  }

  private setupTimeInput(): void {
    const minTimeDate = moment().set(OPENING_HOUR);
    const maxTimeDate = moment().set(CLOSING_HOUR);

    const addOneHourDate: moment.Moment = moment().add(1, 'hours');
    if (addOneHourDate.isSameOrAfter(maxTimeDate)) {
      // Consider the day is over, add one day to all dates
      const currentDay: number = new Date().getDate();

      minTimeDate.add(1, 'days');
      maxTimeDate.add(1, 'days');
      this.minDate.setDate(currentDay + 1);
      this.maxDate.setDate(currentDay + 1);
      this.reservationForm.value.date.add(1, 'days');
    }

    this.InputTimeMinMax.MIN = minTimeDate;
    this.InputTimeMinMax.MAX = maxTimeDate;

    this.updateDisableUnderValue();
  }

  private updateDisableUnderValue(): void {
    const addOneHourDate: moment.Moment = moment()
      .set({ day: this.reservationForm.value.date.day() })
      .add(1, 'hours');

    if (addOneHourDate.isSameOrAfter(this.InputTimeMinMax.MAX)) {
      this.InputTimeMinMax.DisableUnder = null;
    } else if (addOneHourDate.isSameOrAfter(this.InputTimeMinMax.MIN)) {
      // Customers can make a reservation max 1h before
      this.InputTimeMinMax.DisableUnder = moment().set({
        hour: addOneHourDate.hour(),
        minute: this.roundedDownQuarter(addOneHourDate.minutes()),
      });
    }
  }

  private roundedDownQuarter(minutes: number): number {
    return Math.floor(minutes / 15) * 15;
  }

  submitForm(): void {
    if (!this.reservationForm.valid) {
      return;
    }
    this.loadingSubmit = true;
    of('reponse')
      .pipe(delay(2000))
      .subscribe(() => {
        this.loadingSubmit = false;
        this.openSnackBar(
          this.translate.instant('SNACKBARS.RESERVATION_FULL'),
          this.translate.instant('SHARED.OK')
        );
      });
  }

  updateFormTime($event: moment.Moment): void {
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

  onDateChange(): void {
    this.updateDisableUnderValue();
  }
}

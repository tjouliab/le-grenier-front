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
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DateTime } from 'luxon';
import { TimeDropdownComponent } from '../../../time-dropdown/time-dropdown.component';

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
    MIN: moment.utc(),
    MAX: moment.utc(),
  };
  minutesGap: number = 15;
  required = true;

  InputPersonMinMax = {
    MIN: 1,
    MAX: 8,
  };

  messageMaxLength: number = 150;

  reservationForm = new FormGroup({
    date: new FormControl(moment.utc(), [Validators.required]),
    time: new FormControl(moment.utc(), [Validators.required]),
    personNumber: new FormControl(this.InputPersonMinMax.MIN, [
      Validators.required,
      Validators.min(this.InputPersonMinMax.MIN),
      Validators.max(this.InputPersonMinMax.MAX),
    ]),
    message: new FormControl('', [Validators.maxLength(this.messageMaxLength)]),
  });

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Setup date input
    const currentMonth: number = new Date().getMonth();
    this.maxDate.setMonth(currentMonth + 1);

    // Setup time input
    this.InputTimeMinMax.MIN = this.InputTimeMinMax.MIN.set({
      hour: 18,
      minute: 0,
    });
    this.InputTimeMinMax.MAX = this.InputTimeMinMax.MAX.set({
      hour: 22,
      minute: 30,
    });
  }

  submitForm(): void {
    console.log('reservation', this.reservationForm.value);
    if (!this.reservationForm.valid) {
      return;
    }
  }

  updateFormTime($event: Moment) {
    if ($event) {
      this.reservationForm.patchValue({ time: $event });
    }
  }
}

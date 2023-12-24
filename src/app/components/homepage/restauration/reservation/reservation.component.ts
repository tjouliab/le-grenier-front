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

  InputPersonMinMax = {
    MIN: 1,
    MAX: 8,
  };

  reservationForm = new FormGroup({
    date: new FormControl(moment.utc(), [Validators.required]),
    time: new FormControl('', [Validators.required]),
    personNumber: new FormControl(this.InputPersonMinMax.MIN, [
      Validators.required,
      Validators.min(this.InputPersonMinMax.MIN),
      Validators.max(this.InputPersonMinMax.MAX),
    ]),
  });

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const currentMonth: number = new Date().getMonth();
    this.maxDate.setMonth(currentMonth + 1);
  }

  submitForm(): void {
    if (!this.reservationForm.valid) {
      return;
    }
  }
}

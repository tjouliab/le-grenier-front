import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';

interface TimeSelection {
  hour: string;
  disabled: boolean;
}

@Component({
  selector: 'app-time-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
  ],
  templateUrl: './time-dropdown.component.html',
  styleUrl: './time-dropdown.component.scss',
})
export class TimeDropdownComponent {
  @Input()
  min: moment.Moment = moment().startOf('day');

  @Input()
  max: moment.Moment = moment().endOf('day').subtract(1, 'minute');

  @Input()
  disableUnder: moment.Moment = null;

  @Input()
  disableOver: moment.Moment = null;

  @Input()
  minutesGap: number = 5;

  @Input()
  placeholder: string = 'hh:mm';

  @Input()
  required: boolean = true;

  @Output()
  newTimeSelectionEvent = new EventEmitter<moment.Moment>();

  timeSelection: TimeSelection[] = [];
  timeSelectionForm: FormControl;
  timeFormat: string = 'HH:mm';

  constructor() {}

  ngOnInit(): void {
    // Initialize time form
    if (this.required) {
      this.timeSelectionForm = new FormControl('', Validators.required);
    } else {
      this.timeSelectionForm = new FormControl('');
    }
    this.timeSelectionForm.valueChanges.subscribe((selectedTime: string) => {
      this.newTimeSelectionEvent.emit(moment(selectedTime, this.timeFormat));
    });

    this.updateTimeSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disableUnder'] && !changes['disableUnder'].firstChange) {
      this.updateTimeSelection();
    }
    if (changes['disableOver'] && !changes['disableOver'].firstChange) {
      this.updateTimeSelection();
    }
  }

  private isTimeSelectionDisabled(timeToInsert: moment.Moment): boolean {
    if (this.disableUnder) {
      if (timeToInsert.isBefore(this.disableUnder)) {
        return true;
      }
    }
    if (this.disableOver) {
      if (timeToInsert.isAfter(this.disableUnder)) {
        return true;
      }
    }
    return false;
  }

  private updateTimeSelection(): void {
    this.timeSelection = [];
    let timeToInsert: moment.Moment = this.min.clone();
    while (timeToInsert.isSameOrBefore(this.max)) {
      this.timeSelection.push({
        hour: timeToInsert.format(this.timeFormat).toString(),
        disabled: this.isTimeSelectionDisabled(timeToInsert),
      });
      timeToInsert = timeToInsert.add(this.minutesGap, 'minutes');
    }

    // If switching days, check that time is not disabled
    if (
      !this.timeSelection.find(
        (time) => time.hour === this.timeSelectionForm?.value && !time.disabled
      )
    ) {
      this.timeSelectionForm.patchValue('');
    }
  }
}

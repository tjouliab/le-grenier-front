import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { Moment } from 'moment';
import moment from 'moment';
import { MatIconModule } from '@angular/material/icon';

const NOOP_VALUE_ACCESSOR: ControlValueAccessor = {
  writeValue(): void {},
  registerOnChange(): void {},
  registerOnTouched(): void {},
};

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
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  templateUrl: './time-dropdown.component.html',
  styleUrl: './time-dropdown.component.scss',
})
export class TimeDropdownComponent {
  @Input()
  min: Moment = moment.utc().startOf('day');

  @Input()
  max: Moment = moment.utc().endOf('day').subtract(1, 'minute');

  @Input()
  minutesGap: number = 5;

  @Input()
  placeholder: string = 'hh:mm';

  @Input()
  required: boolean = true;

  @Output()
  newTimeSelectionEvent = new EventEmitter<Moment>();

  timeSelection: string[] = [];
  timeSelectionForm: FormControl;
  timeFormat: string = 'HH:mm';

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = NOOP_VALUE_ACCESSOR;
    }
  }

  ngOnInit(): void {
    // Initialize time selection
    let timeToInsert: Moment = this.min;
    while (timeToInsert.isSameOrBefore(this.max)) {
      this.timeSelection.push(timeToInsert.format(this.timeFormat).toString());
      timeToInsert = timeToInsert.add(this.minutesGap, 'minutes');
    }

    // Initialize time form
    if (this.required) {
      this.timeSelectionForm = new FormControl('', Validators.required);
    } else {
      this.timeSelectionForm = new FormControl('');
    }
    this.timeSelectionForm.valueChanges.subscribe((selectedTime: string) => {
      this.newTimeSelectionEvent.emit(moment(selectedTime, this.timeFormat));
    });
  }
}

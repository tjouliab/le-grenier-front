import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { of, delay } from 'rxjs';
import { CustomSnackbarComponent } from '../../../snackbars/custom-snackbar/custom-snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import moment from 'moment';
import { RoomsService } from '../../../../services/rooms.service';
import { BedroomDto } from '../../../../dto/bedroom.dto';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
    FormsModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  templateUrl: './room-reservation.component.html',
  styleUrl: './room-reservation.component.scss',
})
export class RoomReservationComponent {
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (
      !this.childrenCheckboxContainer.nativeElement.contains(clickedElement)
    ) {
      this.childrenCheckboxFocused = false;
    }
    if (!this.petsCheckboxContainer.nativeElement.contains(clickedElement)) {
      this.petsCheckboxFocused = false;
    }
  }

  @ViewChild('childrenCheckboxContainer')
  childrenCheckboxContainer: ElementRef;

  @ViewChild('petsCheckboxContainer')
  petsCheckboxContainer: ElementRef;

  @ViewChild('childrenCheckbox')
  childrenCheckbox: MatCheckbox;

  @ViewChild('petsCheckbox')
  petsCheckbox: MatCheckbox;

  childrenCheckboxFocused: boolean = false;
  petsCheckboxFocused: boolean = false;

  rooms: BedroomDto[] = [];
  roomsDropdownOpened: boolean = false;

  minStartDate: Date = new Date();
  maxStartDate: Date = new Date();
  minEndDate: Date = new Date();
  maxEndDate: Date = new Date();
  datePlaceholder: string = MY_FORMATS.parse.dateInput;

  messageMaxLength: number = 150;

  reservationForm = new FormGroup({
    startDate: new FormControl(moment(), [Validators.required]),
    endDate: new FormControl(moment().add(1, 'day'), [Validators.required]),
    selectedRooms: new FormControl([], [Validators.required]),
    hasChildren: new FormControl(false, [Validators.required]),
    hasPets: new FormControl(false, [Validators.required]),
    message: new FormControl('', [Validators.maxLength(this.messageMaxLength)]),
  });

  loadingSubmit: boolean = false;
  arrivalPopupOpened = false;
  departurePopupOpened = false;

  constructor(
    private translate: TranslateService,
    private roomsService: RoomsService,
    private _snackBar: MatSnackBar,
    private _adapter: DateAdapter<any>
  ) {}

  ngOnInit(): void {
    this.setupLocalDateFormat();
    // Setup start date input
    const currentDay: number = new Date().getDate();
    this.minEndDate.setDate(currentDay + 1);
    this.maxEndDate.setDate(currentDay + 1);

    const currentMonth: number = new Date().getMonth();
    this.maxStartDate.setMonth(currentMonth + 1);
    this.maxEndDate.setMonth(currentMonth + 1);

    // Get room list
    this.roomsService.findAllRooms().subscribe({
      next: (response: BedroomDto[]) => {
        this.rooms = response;
      },
      error: (error) => {
        // this.openErrorSnackBar(
        //   this.translate.instant('SNACKBARS.SERVER_ERROR'),
        //   this.translate.instant('SHARED.OK')
        // );
      },
    });
  }

  submitForm(): void {
    if (!this.reservationForm.valid) {
      return;
    }
    this.loadingSubmit = true;
    of('response')
      .pipe(delay(2000))
      .subscribe((data) => {
        this.loadingSubmit = false;
        this.openSnackBar(
          this.translate.instant('SNACKBARS.RESERVATION_FULL'),
          this.translate.instant('SHARED.OK')
        );
      });
  }

  private setupLocalDateFormat(): void {
    this._adapter.setLocale(this.translate.currentLang);
    this.translate.onLangChange.subscribe({
      next: (event: { lang: string }) => {
        this._adapter.setLocale(event.lang);
      },
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

  protected childrenCheckboxToggle($event?: MouseEvent): void {
    this.childrenCheckboxFocused = true;
    this.petsCheckboxFocused = false;
    if ($event) {
      $event.stopPropagation();
      return;
    }
    this.childrenCheckbox.toggle();
  }

  protected petsCheckboxToggle($event?: MouseEvent): void {
    this.childrenCheckboxFocused = false;
    this.petsCheckboxFocused = true;
    if ($event) {
      $event.stopPropagation();
      return;
    }
    this.petsCheckbox.toggle();
  }

  protected onOpenedChange($event: boolean): void {
    this.roomsDropdownOpened = $event;
  }
}

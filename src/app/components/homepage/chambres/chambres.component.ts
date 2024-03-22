import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomReservationComponent } from './room-reservation/room-reservation.component';
import { BedroomDto } from '../../../dto/bedroom.dto';
import { RoomsService } from '../../../services/rooms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../snackbars/custom-snackbar/custom-snackbar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BedroomComponent } from "./bedroom/bedroom.component";

@Component({
    selector: 'app-chambres',
    standalone: true,
    templateUrl: './chambres.component.html',
    styleUrl: './chambres.component.scss',
    imports: [CommonModule, RoomReservationComponent, TranslateModule, BedroomComponent]
})
export class ChambresComponent {
  roomsToDisplay: BedroomDto[] = [];

  constructor(
    private translate: TranslateService,
    private roomsService: RoomsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roomsService.findAllRooms().subscribe({
      next: (response: BedroomDto[]) => {
        this.roomsToDisplay = response;
      },
      error: (error) => {
        this.openErrorSnackBar(
          this.translate.instant('SNACKBARS.SERVER_ERROR'),
          this.translate.instant('SHARED.OK')
        );
      },
    });
  }

  private openErrorSnackBar(message: string, action: string): void {
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

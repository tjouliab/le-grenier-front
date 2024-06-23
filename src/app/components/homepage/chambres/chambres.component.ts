import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomReservationComponent } from './room-reservation/room-reservation.component';
import { BedroomDto } from '../../../dto/bedroom.dto';
import { RoomsService } from '../../../services/rooms.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BedroomComponent } from "./bedroom/bedroom.component";
import { SnackbarService } from '../../snackbars/snackbar.service';

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
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.roomsService.findAllRooms().subscribe({
      next: (response: BedroomDto[]) => {
        this.roomsToDisplay = response;
      },
      error: (error) => {
        this.snackbarService.openErrorSnackbar(
          this.translate.instant('SNACKBARS.SERVER_ERROR'),
          this.translate.instant('SHARED.OK')
        );
      },
    });
  }
}

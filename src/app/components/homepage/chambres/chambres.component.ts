import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomReservationComponent } from './room-reservation/room-reservation.component';

@Component({
  selector: 'app-chambres',
  standalone: true,
  imports: [CommonModule, RoomReservationComponent],
  templateUrl: './chambres.component.html',
  styleUrl: './chambres.component.scss'
})
export class ChambresComponent {

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';

@Component({
  selector: 'app-restauration',
  standalone: true,
  imports: [CommonModule, ReservationComponent],
  templateUrl: './restauration.component.html',
  styleUrl: './restauration.component.scss',
})
export class RestaurationComponent {}

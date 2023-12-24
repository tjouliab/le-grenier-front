import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { MealComponent } from './meal/meal.component';
import {
  Allergy,
  MealDisplayDto,
  MealPrices,
  MealTypes,
} from '../../../dto/mealDisplay.dto';

@Component({
  selector: 'app-restauration',
  standalone: true,
  imports: [CommonModule, ReservationComponent, MealComponent],
  templateUrl: './restauration.component.html',
  styleUrl: './restauration.component.scss',
})
export class RestaurationComponent {
  mealsToDisplay: MealDisplayDto[] = [
    {
      imagePath: 'assets/images/meals/meal-placeholder.png',
      chefName: 'Mattéo',
      mealTitle: 'Pâtes au pesto',
      type: MealTypes.Main,
      price: MealPrices.Cheap,
      description:
        "Délicieuses pâtes accompagnées d'un fromage dégoulinant miam miam",
      allergies: [],
    },
  ];
}

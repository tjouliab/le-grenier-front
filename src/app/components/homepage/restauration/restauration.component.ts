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
        "Délicieuses pâtes accompagnées d'un fromage dégoulinant miam miam Délicieuses pâtes accompagnées d'un fromage dégoulinant miam miam Délicieuses pâtes accompagnées d'un fromage dégoulinant miam miam Délicieuses pâtes accompagnées d'un fromage dégoulinant miam miam",
      allergies: [],
    },
    {
      imagePath: 'assets/images/meals/meal-placeholder.png',
      chefName: 'Mattéo',
      mealTitle: 'Pâtes au pesto Pâtes au pesto Pâtes au pesto',
      type: MealTypes.Main,
      price: MealPrices.Expensive,
      description:
        "Délicieuses pâtes accompagnées d'un fromage dégoulinant miam miam",
      allergies: [],
    },
    {
      imagePath: 'assets/images/meals/meal-placeholder.png',
      chefName: 'Mattéo',
      mealTitle: 'Pâtes au pesto',
      type: MealTypes.Main,
      price: MealPrices.Normal,
      description:
        "Délicieuses pâtes accompagnées d'un fromage dégoulinant miam miam",
      allergies: [],
    },
    {
      imagePath: 'assets/images/meals/meal-placeholder.png',
      chefName: 'Mattéo',
      mealTitle: 'Pâtes au pesto',
      type: MealTypes.Entry,
      price: MealPrices.Cheap,
      description:
        "Délicieuses pâtes accompagnées d'un fromage dégoulinant miam miam",
      allergies: [],
    },
    {
      imagePath: 'assets/images/meals/meal-placeholder.png',
      chefName: 'Mattéo',
      mealTitle: 'Pâtes au pesto',
      type: MealTypes.Dessert,
      price: MealPrices.Cheap,
      description:
        "Délicieuses pâtes accompagnées d'un fromage dégoulinant miam miam",
      allergies: [],
    },
    {
      imagePath: 'assets/images/meals/meal-placeholder.png',
      chefName: 'Mattéo',
      mealTitle: 'Pâtes au pesto',
      type: MealTypes.Dessert,
      price: MealPrices.Cheap,
      description:
        "Délicieuses pâtes accompagnées d'un fromage dégoulinant miam miam",
      allergies: [],
    },
  ];

  entriesList: MealDisplayDto[];
  mainList: MealDisplayDto[];
  dessertList: MealDisplayDto[];

  constructor() {}

  ngOnInit(): void {
    if (!this.mealsToDisplay || this.mealsToDisplay.length === 0) {
      return;
    }
    this.entriesList = this.mealsToDisplay.filter(
      (meal) => meal.type === MealTypes.Entry
    );
    this.mainList = this.mealsToDisplay.filter(
      (meal) => meal.type === MealTypes.Main
    );
    this.dessertList = this.mealsToDisplay.filter(
      (meal) => meal.type === MealTypes.Dessert
    );
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  MealTypes,
  MealPrices,
  MealDto,
} from '../../../../dto/mealDisplay.dto';
import { Allergy } from '../../../../dto/allergy.dto';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.scss',
})
export class MealComponent {
  @Input()
  meal: MealDto;

  imageUrl: string;
  chefName: string;
  mealTitle: string;
  type: MealTypes;
  price: MealPrices;
  description: string;
  allergies: Allergy[];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    if (!this.meal) {
      return;
    }
    this.imageUrl = this.meal.imageUrl;
    this.chefName = this.meal.chefName;
    this.mealTitle = this.meal.mealTitle;
    this.type = this.meal.type;
    this.price = this.meal.price;
    this.description = this.meal.description;
    this.allergies = this.meal.allergies;
  }
}

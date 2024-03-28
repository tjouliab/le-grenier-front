import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  MealTypes,
  MealPrices,
  MealDto,
} from '../../../../dto/mealDisplay.dto';
import { Allergy } from '../../../../dto/allergy.dto';
import { ChefData } from '../../../../dto/chef.dto';
import { TooltipDirective } from '../../../../directives/tooltip.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import moment from 'moment';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TooltipDirective,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.scss',
})
export class MealComponent {
  @Input()
  meal: MealDto;

  @Input()
  chefNameMode = false;

  @Output()
  chefNameClick = new EventEmitter<boolean>();

  imageUrl: string;
  chefName: string;
  mealTitle: string;
  type: MealTypes;
  price: MealPrices;
  description: string;
  allergies: Allergy[];
  chefData: ChefData;

  chefYearsOfExperience: number;

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
    this.chefData = this.meal.chefData;

    this.calculateYearsOfExperience();
  }

  protected onChefNameClick(): void {
    this.chefNameClick.emit(true);
  }

  private calculateYearsOfExperience(): void {
    this.chefYearsOfExperience =
      moment().diff(moment(this.chefData.arrivalDay), 'years') + 1;
  }
}

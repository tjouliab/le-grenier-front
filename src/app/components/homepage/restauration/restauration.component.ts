import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { MealComponent } from './meal/meal.component';
import { MealDto, MealTypes } from '../../../dto/mealDisplay.dto';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MealsService } from '../../../services/meals.service';
import { SnackbarService } from '../../snackbars/snackbar.service';

@Component({
  selector: 'app-restauration',
  standalone: true,
  imports: [CommonModule, ReservationComponent, MealComponent, TranslateModule],
  templateUrl: './restauration.component.html',
  styleUrl: './restauration.component.scss',
})
export class RestaurationComponent {
  mealsToDisplay: MealDto[] = [];
  entriesList: MealDto[];
  mainList: MealDto[];
  dessertList: MealDto[];

  chefNameMode = false;

  constructor(
    private translate: TranslateService,
    private mealsService: MealsService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.mealsService.findAllMeals().subscribe({
      next: (response: MealDto[]) => {
        this.mealsToDisplay = response;
        this.initMealListByType();
      },
      error: (error) => {
        this.snackbarService.openErrorSnackbar(
          this.translate.instant('SNACKBARS.SERVER_ERROR'),
          this.translate.instant('SHARED.OK')
        );
      },
    });
  }

  private initMealListByType(): void {
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

  protected chefNameOnClick(): void {
    this.chefNameMode = !this.chefNameMode;
  }
}

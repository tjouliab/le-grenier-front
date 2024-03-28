import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import { MealComponent } from './meal/meal.component';
import { MealDto, MealTypes } from '../../../dto/mealDisplay.dto';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MealsService } from '../../../services/meals.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../snackbars/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-restauration',
  standalone: true,
  imports: [
    CommonModule,
    ReservationComponent,
    MealComponent,
    TranslateModule,
    CustomSnackbarComponent,
  ],
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
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mealsService.findAllMeals().subscribe({
      next: (response: MealDto[]) => {
        this.mealsToDisplay = response;
        this.initMealListByType();
      },
      error: (error) => {
        this.openErrorSnackBar(
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

  openErrorSnackBar(message: string, action: string): void {
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 5000,
      data: {
        message,
        action,
      },
      panelClass: 'error-snackbar',
    });
  }

  protected chefNameOnClick(): void {
    this.chefNameMode = !this.chefNameMode;
  }
}

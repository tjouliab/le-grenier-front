import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MealDto } from '../dto/mealDisplay.dto';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  base: string = 'http://localhost:3000/meals';

  constructor(private http: HttpClient) {}

  findAllMeals(): Observable<MealDto[]> {
    return this.http.get<MealDto[]>(`${this.base}`);
  }
}

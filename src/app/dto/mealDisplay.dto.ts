import { Allergy } from './allergy.dto';
import { ChefData } from './chef.dto';

export class MealDto {
  imagePath: string;
  chefName: string;
  mealTitle: string;
  type: MealTypes;
  price: MealPrices;
  description: string;
  allergiesName: AllergiesName[];
  allergies: Allergy[];
  imageUrl: string;
  chefData: ChefData;
}

export enum MealPrices {
  Cheap = '$',
  Normal = '$$',
  Expensive = '$$$',
}

export enum MealTypes {
  Entry = 1,
  Main = 2,
  Dessert = 3,
}

export enum AllergiesName {
  Vegan = 1,
  Gluten = 2,
  Milk = 3,
  Crusaceans = 4,
  Egg = 5,
  Fish = 6,
  Peanut = 7,
}

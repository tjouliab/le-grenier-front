export class MealDisplayDto {
  imagePath: string;
  chefName: string;
  mealTitle: string;
  type: MealTypes;
  price: MealPrices;
  description: string;
  allergies?: Allergy[];
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

export class Allergy {
  name: string;
  logoPath: string;
}

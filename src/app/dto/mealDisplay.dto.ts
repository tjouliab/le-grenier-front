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
  Entry = 'Entrée',
  Main = 'Plat principal',
  Desssert = 'Dessert',
}

export class Allergy {
  name: string;
  logoPath: string;
}

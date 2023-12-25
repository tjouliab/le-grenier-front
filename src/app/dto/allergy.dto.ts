export class Allergy {
  id: number;
  logoPath: string;
  tooltip: string;
}

// Déclaration des différentes indications alimentaires (allergies, sans viande etc...)
export const VeganAllergy: Allergy = {
  id: 1,
  logoPath: 'assets/images/allergies/vegan.png',
  tooltip: 'Vegan',
};

export const GlutenFreeAllergy: Allergy = {
  id: 2,
  logoPath: 'assets/images/allergies/gluten-free.png',
  tooltip: 'Sans Gluten',
};

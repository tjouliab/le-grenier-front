export class Allergy {
  id: number;
  logoPath: string;
  tooltip: string;
}

// Déclaration des différentes indications alimentaires (allergies, sans viande etc...)
// export const VeganAllergy: Allergy = {
//   id: 1,
//   logoPath: 'assets/images/allergies/vegan.png',
//   tooltip: 'Vegan',
// };

export const GlutenAllergy: Allergy = {
  id: 2,
  logoPath: 'assets/images/allergies/gluten.svg',
  tooltip: 'RESTAURATION.ALLERGIES.GLUTEN',
};

export const MilkAllergy: Allergy = {
  id: 3,
  logoPath: 'assets/images/allergies/milk.svg',
  tooltip: 'RESTAURATION.ALLERGIES.MILK',
};

export const CrustaceansAllergy: Allergy = {
  id: 4,
  logoPath: 'assets/images/allergies/crustaceans.svg',
  tooltip: 'RESTAURATION.ALLERGIES.CRUSTACEANS',
};

export const EggAllergy: Allergy = {
  id: 5,
  logoPath: 'assets/images/allergies/egg.svg',
  tooltip: 'RESTAURATION.ALLERGIES.EGGS',
};

export const FishAllergy: Allergy = {
  id: 6,
  logoPath: 'assets/images/allergies/fish.svg',
  tooltip: 'RESTAURATION.ALLERGIES.FISH',
};

export const PeanutAllergy: Allergy = {
  id: 7,
  logoPath: 'assets/images/allergies/peanut.svg',
  tooltip: 'RESTAURATION.ALLERGIES.PEANUT',
};

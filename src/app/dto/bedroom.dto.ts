export class BedroomDto {
  imagesPath: string[];
  bedroomName: string;
  numberPersonMax: number;
  numberSurface: number;
  price: RoomPrice;
  bedType: BedType;
  shortDescription: string;
  assets: Asset[];
}

export enum BedType {
  SingleBed = 'Lit simple',
  SingleTwoBed = '2 Lits simples',
  DoubleBed = 'Lit double',
  DoubleTwoBed = '2 Lits doubles',
  Couch = 'Canapé',
  CouchTwo = '2 Canapés',
}

export enum Asset {
  Swimmingpool = 'Piscine à boule',
  Desk = 'Bureau',
  Sink = 'Evier',
  Bathroom = 'Salle de bain',
  Tele = 'Télévision',
  Consoles = 'PS5 et Nintendo Switch',
  Mirror = 'Mirror',
  Cathedral = 'Vue Cathédrale',
  Vinsha = 'Autel pour Vinsha',
  Coffee = 'Machine à café',
}

export enum RoomPrice {
  Cheap = '$',
  Normal = '$$',
  Expensive = '$$$',
}

import { Unit } from '@models/Unit';

export interface Ingredient {
  fdcId: string;
  description: string;
  foodNutrients: FoodNutrient[];
  amount?: string;
  unit?: Unit;
  expirationDate?: string;
  isRunningLow?: boolean;
}

export interface FoodNutrient {
  name: string;
  amount: Number;
  unit: string; // Unit?
  derivationDescription?: string;
}

// "dataType": "Branded",
//   "description": "NUT 'N BERRY MIX",
//   "fdcId": 534358,
//   "foodNutrients": [
//     {
//       "number": 303,
//       "name": "Iron, Fe",
//       "amount": 0.53,
//       "unitName": "mg",
//       "derivationCode": "LCCD",
//       "derivationDescription": "Calculated from a daily value percentage per serving size measure"
//     }
//   ],
//   "publicationDate": "4/1/2019",
//   "brandOwner": "Kar Nut Products Company",
//   "gtinUpc": "077034085228",
//   "ndbNumber": 7954,
//   "foodCode": "27415110"
// }

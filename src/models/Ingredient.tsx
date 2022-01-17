import { Unit } from '@models/Unit';

export interface Ingredient {
  title: string;
  amount?: string;
  unit?: Unit;
  expirationDate?: string;
  isRunningLow?: boolean;
}

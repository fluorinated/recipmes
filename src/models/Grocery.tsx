import { Unit } from '@models/Unit';

export interface Grocery {
  title: string;
  amount?: string;
  unit?: Unit;
}

import { Unit } from "@models/Unit";

export interface Ingredient {
  title: string;
  amount?: number;
  unit?: Unit;
}

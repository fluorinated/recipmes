import { Unit } from "./Unit";

export interface Ingredient {
  title: string;
  amount?: number;
  unit?: Unit;
}

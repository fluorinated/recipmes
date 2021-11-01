import { FoodCategory } from "./FoodCategory";
import { Ingredient } from "./Ingredient";

export interface Recipe {
  title: string;
  cookTimeHours: number;
  cookTimeMinutes: number;
  categories: FoodCategory[];
  isFavorite: boolean;
  isFlagged: boolean;
  photo: string;
  ingredients: Ingredient[];
  steps: string[];
}

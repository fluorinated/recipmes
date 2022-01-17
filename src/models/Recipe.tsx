import { FoodCategory } from '@models/FoodCategory';
import { Ingredient } from '@models/Ingredient';

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

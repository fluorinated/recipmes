import { Recipe } from "@models/Recipe";

export interface Menu {
  title: string;
  recipes: Recipe[];
}

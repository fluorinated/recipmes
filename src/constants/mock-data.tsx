import { Recipe } from "@models/Recipe";
import { FoodCategory } from "models/FoodCategory";
import { Unit } from "models/Unit";
import { mockPhoto } from "./mock-photo";
import { mockPhoto2 } from "./mock-photo-2";

export const mockDataRecipe = {
  _id: "KgGx7WmHmV",
  categories: ["breakfast", "lunch"],
  ingredients: [{ unit: "tsp.", amount: "1/4", title: "Honey" }],
  steps: ["Step 1"],
  title: "Pizza fest",
  cookTimeHours: 1,
  cookTimeMinutes: 2,
  isFavorite: true,
  isFlagged: false,
  photo: mockPhoto,
  _updated_at: "2021-11-28T04:30:23.951+00:00",
  _created_at: "2021-11-28T04:30:23.951+00:00",
};

export const mockDataRecipe2 = {
  _id: "HvNN4svAWi",
  categories: ["dinner", "drink", "dessert", "appetizer"],
  ingredients: [
    { unit: "tsp.", amount: "2", title: "chopped onions" },
    { unit: "tsp.", amount: "3.4", title: "vanilla extract" },
  ],
  steps: [
    "Step 1 is to hold hands with me",
    "Please because I really love you",
  ],
  title: "toasty toast the toastiest toast ever",
  cookTimeHours: 4,
  cookTimeMinutes: 95,
  isFavorite: true,
  isFlagged: true,
  photo: mockPhoto2,
  _updated_at: "2021-11-28T04:30:23.951+00:00",
  _created_at: "2021-11-28T04:30:23.951+00:00",
};

export const mockDataRecipes = [mockDataRecipe, mockDataRecipe2];

export const mockRecipe: Recipe = {
  categories: [FoodCategory.Breakfast, FoodCategory.Lunch],
  ingredients: [{ unit: Unit.Cup, amount: "1/4", title: "Honey" }],
  steps: ["Step 1"],
  title: "Pizza fest",
  cookTimeHours: 1,
  cookTimeMinutes: 2,
  isFavorite: true,
  isFlagged: false,
  photo: mockPhoto,
};

export const mockRecipe2: Recipe = {
  categories: [
    FoodCategory.Dinner,
    FoodCategory.Drink,
    FoodCategory.Dessert,
    FoodCategory.Appetizer,
  ],
  ingredients: [
    { unit: Unit.Teaspoon, amount: "2", title: "chopped onions" },
    { unit: Unit.Teaspoon, amount: "3.4", title: "vanilla extract" },
  ],
  steps: [
    "Step 1 is to hold hands with me",
    "Please because I really love you",
  ],
  title: "toasty toast the toastiest toast ever",
  cookTimeHours: 4,
  cookTimeMinutes: 95,
  isFavorite: true,
  isFlagged: true,
  photo: mockPhoto2,
};

export const mockRecipes = [mockRecipe, mockRecipe2];

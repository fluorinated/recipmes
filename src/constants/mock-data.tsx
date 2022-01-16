import { Recipe } from "@models/Recipe";
import { FoodCategory } from "models/FoodCategory";
import { Unit } from "models/Unit";
import { mockPhoto } from "./mock-photo";
import { mockPhoto2 } from "./mock-photo-2";

export const mockDataRecipe = {
  _id: "KgGx7WmHmV",
  categories: ["breakfast", "lunch"],
  ingredients: [
    { unit: "tsp.", amount: "1/4", title: "Honey" },
    { unit: "", amount: "1", title: "Tomato" },
    { unit: "oz.", amount: "1/2", title: "chopped onions" },
    { unit: "", amount: "1", title: "jelly" },
    { unit: "tsp.", amount: "1/3", title: "peanut butter" },
    { unit: "", amount: "2", title: "slices of bread" },
  ],
  steps: [
    "Step 1",
    "Step 2",
    "Step 2.5 i also wanted this one to be long so im also going to say a bunch of things here to fill the space. i really really like dirt monkey a lot haha i mean did you not know this? come on like i really listen to dirt monkey like all the time haha",
    "step 3 is longer hehehehe",
    "Step 4 well i mean i might as well write a really long paragraph here cuz like steps are seriously super long and honestly it kinda reminds me of chemistry lab lol omg now i miss chem lab haha dang wow okay i hope this is long enough lolzies",
  ],
  title: "pizza butter jelly sandwich",
  cookTimeHours: 3,
  cookTimeMinutes: 46,
  isFavorite: true,
  isFlagged: false,
  photo: mockPhoto,
  _updated_at: "2021-11-28T04:30:23.951+00:00",
  _created_at: "2021-11-28T04:30:23.951+00:00",
};

export const mockDataRecipe2 = {
  _id: "HvNN4svAWi",
  categories: [
    "breakfast",
    "lunch",
    "dinner",
    "drink",
    "dessert",
    "appetizer",
    "snack",
  ],
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

export const mockDataRecipe3 = {
  _id: "KvND4wmADj",
  categories: ["breakfast", "lunch", "dessert", "dinner", "appetizer"],
  ingredients: [
    { unit: "", amount: "2", title: "sliced apples" },
    { unit: "handful", amount: "1", title: "chopped liver (your choice)" },
  ],
  steps: ["wash the apples", "slice the apples"],
  title: "sliced apples and chopped liver",
  cookTimeHours: 0,
  cookTimeMinutes: 13,
  isFavorite: true,
  isFlagged: true,
  photo: mockPhoto,
  _updated_at: "2022-01-15T09:54:45.222+00:00",
  _created_at: "2022-01-15T09:54:45.222+00:00",
};

export const mockDataRecipes = [
  mockDataRecipe,
  mockDataRecipe2,
  mockDataRecipe3,
];

export const mockRecipe: Recipe = {
  categories: [FoodCategory.Breakfast, FoodCategory.Lunch],
  ingredients: [
    { unit: Unit.Teaspoon, amount: "1/4", title: "Honey" },
    { amount: "1", title: "Tomato" },
    { unit: Unit.Ounce, amount: "1/2", title: "chopped onions" },
    { unit: Unit.Tablespoon, amount: "1", title: "jelly" },
    { unit: Unit.Tablespoon, amount: "1/3", title: "peanut butter" },
    { amount: "2", title: "slices of bread" },
  ],
  steps: [
    "Step 1",
    "Step 2",
    "Step 2.5 i also wanted this one to be long so im also going to say a bunch of things here to fill the space. i really really like dirt monkey a lot haha i mean did you not know this? come on like i really listen to dirt monkey like all the time haha",
    "step 3 is longer hehehehe",
    "Step 4 well i mean i might as well write a really long paragraph here cuz like steps are seriously super long and honestly it kinda reminds me of chemistry lab lol omg now i miss chem lab haha dang wow okay i hope this is long enough lolzies",
  ],
  title: "pizza fest",
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

export const mockRecipe3: Recipe = {
  categories: [
    FoodCategory.Dinner,
    FoodCategory.Lunch,
    FoodCategory.Dessert,
    FoodCategory.Appetizer,
    FoodCategory.Breakfast,
    FoodCategory.Dinner,
    FoodCategory.Drink,
  ],
  ingredients: [
    { unit: Unit.Ounce, amount: "2", title: "sliced apples" },
    { unit: Unit.DeciLiter, amount: "1", title: "chopped liver (your choice)" },
  ],
  steps: ["wash the apples", "slice the apples"],
  title: "sliced apples and chopped liver",
  cookTimeHours: 0,
  cookTimeMinutes: 13,
  isFavorite: true,
  isFlagged: true,
  photo: mockPhoto,
};

export const mockRecipes = [mockRecipe, mockRecipe2, mockRecipe3];

import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import { Colors } from "@constants/colors";
import RecInput from "@rec/RecInput";
import RecCheckbox from "@rec/RecCheckbox";
import RecButton from "@rec/RecButton";
import RecTagList from "@rec/RecTagList";
import RecPhotoUpload from "@rec/RecPhotoUpload";
import Parse from "parse/react-native";
import { Recipe } from "@models/Recipe";
import { FoodCategory } from "@models/FoodCategory";
import { Ingredient } from "@models/Ingredient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RecMultiInput from "@rec/RecMultiInput";

const NewRecipeScreen = (props: any) => {
  const [recipeTitle, setRecipeTitle]: [string, any] = useState("");
  const [cookTimeHours, setCookTimeHours]: [number, any] = useState(0);
  const [cookTimeMinutes, setCookTimeMinutes]: [number, any] = useState(0);
  const [categories, setCategories]: [FoodCategory[], any] = useState([]);
  const [isFavorite, setIsFavorite]: [boolean, any] = useState(false);
  const [isFlagged, setIsFlagged]: [boolean, any] = useState(false);
  const [steps, setSteps]: [string[], any] = useState([]);
  const [ingredients, setIngredients]: [Ingredient[], any] = useState([]);
  const [photo, setPhoto]: [string, any] = useState("");

  const saveRecipe = async () => {
    let Recipe = new Parse.Object("recipe");
    const newRecipe: Recipe = {
      title: recipeTitle,
      cookTimeHours,
      cookTimeMinutes,
      categories,
      isFavorite,
      isFlagged,
      photo,
      ingredients,
      steps,
    };
    let response = await Recipe.save(newRecipe).then(
      (results) => {
        // console.log("results", results);
        props.navigation.navigate("Recipes", {
          screen: "RecipesHome",
          params: { isShowing: true, errorMessage: null },
        });
      },
      (error) => {
        const { message, code } = JSON.parse(JSON.stringify(error));
        props.navigation.navigate("Recipes", {
          screen: "RecipesHome",
          params: {
            isShowing: true,
            errorMessage: `${code} ${message}`,
          },
        });
        console.log("[NewRecipeScreen] saveRecipe error:", error);
      }
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAwareScrollView>
        <View style={styles.inputsContainer}>
          <RecInput
            placeholder="recipe title"
            title="recipe title"
            handleChangeText={(text: string) => setRecipeTitle(text)}
          />
          <Text style={styles.cookTime}>cook time</Text>
          <View style={[styles.row, styles.container]}>
            <RecInput
              placeholder="hours"
              title="hours"
              size="half"
              marginRight={10}
              handleChangeText={(text: string) =>
                setCookTimeHours(Number(text))
              }
              keyboardType="numeric"
            />
            <RecInput
              placeholder="minutes"
              title="minutes"
              size="half"
              handleChangeText={(text: string) =>
                setCookTimeMinutes(Number(text))
              }
              keyboardType="numeric"
            />
          </View>
          <View style={styles.container}>
            <RecTagList
              listType="food"
              selectedTags={(tags: FoodCategory[]) => setCategories(tags)}
            />
          </View>

          <View style={styles.container}>
            <RecCheckbox
              label="favorite"
              isChecked={(isChecked: boolean) => setIsFavorite(isChecked)}
              dark
            />
            <RecCheckbox
              label="want to try"
              isChecked={(isChecked: boolean) => setIsFlagged(isChecked)}
              dark
            />
          </View>

          <View style={styles.container}>
            <RecPhotoUpload
              text="upload recipe photo"
              uploadedImage={(url: string) => setPhoto(url)}
            />
          </View>

          <RecMultiInput
            placeholder="ingredient"
            title="ingredient"
            isIngredients
            ingredients={(ingredients: Ingredient[]) =>
              setIngredients(ingredients)
            }
          />
          <RecMultiInput
            placeholder="step"
            title="step"
            handleChangeText={(text: string[]) => setSteps(text)}
          />
        </View>
        <RecButton handleClick={saveRecipe} label="save recipe" />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.neutral7,
    margin: 10,
    marginBottom: 100,
  },
  inputsContainer: {
    marginBottom: 30,
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  cookTime: {
    color: Colors.neutral1,
    marginTop: 20,
    marginLeft: 5,
  },
  container: {
    paddingBottom: 20,
  },
});

export default NewRecipeScreen;

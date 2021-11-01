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

const NewRecipeScreen = () => {
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
    try {
      let response = await Recipe.save(newRecipe);
      console.log("saved", response);
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAwareScrollView>
        <View style={styles.inputsContainer}>
          <RecInput
            placeholder="recipe"
            title="recipe"
            handleChangeText={(text: string) => setRecipeTitle(text)}
          />
          <Text style={styles.cookTime}>cook time</Text>
          <View style={styles.row}>
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
          <RecTagList
            listType="food"
            selectedTags={(tags: FoodCategory[]) => setCategories(tags)}
          />
          <RecCheckbox
            label="favorite"
            isChecked={(isChecked: boolean) => setIsFavorite(isChecked)}
          />
          <RecCheckbox
            label="want to try"
            isChecked={(isChecked: boolean) => setIsFlagged(isChecked)}
          />
          <RecPhotoUpload uploadedImage={(url: string) => setPhoto(url)} />
          <RecInput
            placeholder="ingredient"
            title="ingredient"
            isMany={true}
            isIngredients={true}
            ingredients={(ingredients: Ingredient[]) =>
              setIngredients(ingredients)
            }
            handleChangeText={() => {}}
          ></RecInput>
          <RecInput
            placeholder="step"
            title="step"
            isMany={true}
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
    backgroundColor: Colors.neutral7,
    flex: 1,
    marginBottom: 80,
  },
  inputsContainer: {
    margin: 10,
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  cookTime: {
    marginTop: 20,
    marginLeft: 5,
    color: Colors.neutral1,
  },
});

export default NewRecipeScreen;

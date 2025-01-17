import { Colors } from '@constants/colors';
import { FoodCategory } from '@models/FoodCategory';
import { Ingredient } from '@models/Ingredient';
import RecButton from '@rec/RecButton';
import RecCheckbox from '@rec/RecCheckbox';
import RecInput from '@rec/RecInput';
import RecLoader from '@rec/RecLoader';
import RecMultiInput from '@rec/RecMultiInput';
import RecPhotoUpload from '@rec/RecPhotoUpload';
import RecTagList from '@rec/RecTagList';
import RecToast from '@rec/RecToast';
import Parse from 'parse/react-native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast]: [any, any] = useState({
    isShowing: false,
    errorMessage: null,
    isError: false,
  });

  const saveRecipe = async () => {
    setIsLoading(true);
    let Recipe = new Parse.Object("recipe");
    const newRecipe = {
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
    await Recipe.save(newRecipe).then(
      (results) => {
        setIsLoading(false);
        props.navigation.navigate("Recipes", {
          screen: "RecipesHome",
          params: { isShowing: true, errorMessage: null },
        });
      },
      (error) => {
        setIsLoading(false);
        const { message, code } = JSON.parse(JSON.stringify(error));
        setToast({
          isShowing: true,
          errorMessage: `${code} ${message}`,
        });
        console.log("[NewRecipeScreen] saveRecipe error:", error);
      }
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <RecToast
        message={toast.isError ?? "error"}
        isShowing={toast.isShowing}
        isError={toast.isError}
        errorMessage={toast.errorMessage}
      />
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
              dark
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
            isNewRecipe
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

        {isLoading ? (
          <RecLoader />
        ) : (
          <RecButton handleClick={saveRecipe} label="save recipe" />
        )}
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
    marginBottom: 10,
    marginLeft: 3,
    fontFamily: "Regular",
  },
  container: {
    paddingBottom: 20,
  },
});

export default NewRecipeScreen;

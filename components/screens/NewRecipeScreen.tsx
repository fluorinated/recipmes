import React, { useState } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from "react-native";
import { Colors } from "../../colors";
import RecInput from "../RecInput";
import RecSelect from "../RecSelect";
import RecCheckbox from "../RecCheckbox";
import RecButton from "../RecButton";
import RecTagList from "../RecTagList";
// import RecPhotoUpload from '../RecPhotoUpload';
import Parse from "parse/react-native";

const NewRecipeScreen = (props) => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [cookTimeHours, setCookTimeHours] = useState(0);
  const [cookTimeMinutes, setCookTimeMinutes] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const saveRecipe = async () => {
    let Recipe = new Parse.Object("recipe");
    const newRecipe = {
      title: recipeTitle,
      cookTimeHours,
      cookTimeMinutes,
      categories,
      isFavorite,
      isFlagged,
      photo: "url?",
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
      <ScrollView>
        <View style={styles.inputsContainer}>
          <RecInput
            placeholder="recipe"
            title="recipe"
            handleChangeText={(text) => setRecipeTitle(text)}
          />
          <Text style={styles.cookTime}>cook time</Text>
          <View style={styles.row}>
            <RecInput
              placeholder="hours"
              title="hours"
              size="half"
              marginRight={10}
              handleChangeText={(text) => setCookTimeHours(Number(text))}
            />
            <RecInput
              placeholder="minutes"
              title="minutes"
              size="half"
              handleChangeText={(text) => setCookTimeMinutes(Number(text))}
            />
          </View>
          <RecTagList
            listType="food"
            selectedTags={(tags) => setCategories(tags)}
          />
          <RecCheckbox
            label="favorite"
            isChecked={(isChecked) => setIsFavorite(isChecked)}
          />
          <RecCheckbox
            label="want to try"
            isChecked={(isChecked) => setIsFlagged(isChecked)}
          />
          {/*<RecPhotoUpload /> */}
          <RecInput
            placeholder="ingredient"
            title="ingredient"
            isMany={true}
            isIngredients={true}
            ingredients={(ingredients) => setIngredients(ingredients)}
            handleChangeText={() => {}}
          ></RecInput>
          <RecInput
            placeholder="step"
            title="step"
            isMany={true}
            handleChangeText={(text) => setSteps(text)}
          />
        </View>
        <RecButton handleClick={saveRecipe} label="save recipe" />
      </ScrollView>
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

import { Colors } from '@constants/colors';
import { mockDataRecipe, mockDataRecipe2, mockDataRecipe3 } from '@constants/mock-data';
import { Recipe } from '@models/Recipe';
import RecButton from '@rec/RecButton';
import RecCard from '@rec/RecCard';
import RecToast from '@rec/RecToast';
import RecipeListEntry from '@screens/recipes/RecipeListEntry';
import Parse from 'parse/react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const RecipesScreen = (props: any) => {
  const [recipes, setRecipes]: [any, any] = useState([
    mockDataRecipe,
    mockDataRecipe2,
    mockDataRecipe3,
  ]);
  const [toast, setToast]: [any, any] = useState({
    isShowing: props.route?.params?.isShowing ?? false,
    errorMessage: props.route?.params?.errorMessage ?? null,
    isError: props.route?.params?.isError ?? false,
  });

  useEffect(() => {
    // getRecipe();
  });

  const getRecipe = async (): Promise<void> => {
    const query = new Parse.Query("recipe");

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    await delay(3000);

    await query.find().then(
      (results) => {
        // console.log("results", results);
        setRecipes(JSON.parse(JSON.stringify(results)));
        setToast({ isShowing: true, errorMessage: null });
      },
      (error) => {
        console.log("[RecipesScreen] getRecipe error:", error);
        const { message, code } = JSON.parse(JSON.stringify(error));
        setToast({
          isShowing: true,
          errorMessage: `${code} ${message}`,
        });
      }
    );
  };

  return (
    <View style={styles.background}>
      <RecToast
        message={toast.isError ? "error" : "success"}
        isShowing={toast.isShowing}
        isError={toast.isError}
        errorMessage={toast.errorMessage}
      />
      <RecButton
        handleClick={() => props.navigation.navigate("NewRecipe")}
        label="add recipe"
      />
      <RecCard search tags paddingLeft={0} paddingBottom={200}>
        {recipes.map((recipe: Recipe, i: number) => (
          <RecipeListEntry
            navigation={props.navigation}
            recipe={recipe}
            key={i}
          />
        ))}
        {recipes.map((recipe: Recipe, i: number) => (
          <RecipeListEntry
            navigation={props.navigation}
            recipe={recipe}
            key={i}
          />
        ))}
      </RecCard>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.neutral7,
  },
});

export default RecipesScreen;

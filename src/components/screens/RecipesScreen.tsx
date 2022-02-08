import { Colors } from '@constants/colors';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '@models/Recipe';
import RecButton from '@rec/RecButton';
import RecCard from '@rec/RecCard';
import RecLoader from '@rec/RecLoader';
import RecipeListEntry from '@screens/recipes/RecipeListEntry';
import RecEmptyState from 'components/rec/RecEmptyState';
import Parse from 'parse/react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const RecipesScreen = (props: any) => {
  const [recipes, setRecipes]: [any, any] = useState(undefined);
  const [toast, setToast]: [any, any] = useState({
    isShowing: props.route?.params?.isShowing ?? false,
    errorMessage: props.route?.params?.errorMessage ?? null,
    isError: props.route?.params?.isError ?? false,
  });

  useEffect(() => {
    getRecipe();
  });

  const getRecipe = async (): Promise<void> => {
    const query = new Parse.Query("recipe");
    await query.find().then(
      (results) => {
        setRecipes(JSON.parse(JSON.stringify(results)));
      },
      (error) => {
        console.log("[RecipesScreen] getRecipe error:", error);
        const { message, code } = JSON.parse(JSON.stringify(error));
      }
    );
  };

  return (
    <View style={styles.background}>
      <RecButton
        handleClick={() => props.navigation.navigate("NewRecipe")}
        label="add recipe"
      />
      <RecCard search tags paddingLeft={0} height={450}>
        {recipes && recipes?.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <RecEmptyState
              icon={faBinoculars}
              header="no recipes found"
              subheader="add a new recipe or adjust your search"
              buttonLabel="add recipe"
            />
          </View>
        )}

        {!recipes && <RecLoader />}

        {recipes &&
          recipes?.length > 0 &&
          recipes.map((recipe: Recipe, i: number) => (
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
  emptyStateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RecipesScreen;

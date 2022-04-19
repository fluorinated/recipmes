import { Colors } from '@constants/colors';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { FoodCategory } from '@models/FoodCategory';
import { Recipe } from '@models/Recipe';
import RecButton from '@rec/RecButton';
import RecCard from '@rec/RecCard';
import RecEmptyState from '@rec/RecEmptyState';
import RecLoader from '@rec/RecLoader';
import RecipeListEntry from '@screens/recipes/RecipeListEntry';
import { setIsLoaded, setRecipes, setTags } from '@store/recipes/recipes.reducer';
import { selectFilteredRecipes, selectIsLoaded } from '@store/recipes/recipes.selectors';
import Parse from 'parse/react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const RecipesScreen = (props: any) => {
  const recipes: Recipe[] = useAppSelector(selectFilteredRecipes);
  const isLoaded: boolean = useAppSelector(selectIsLoaded);
  const [toast, setToast]: [any, any] = useState({
    isShowing: props.route?.params?.isShowing ?? false,
    errorMessage: props.route?.params?.errorMessage ?? null,
    isError: props.route?.params?.isError ?? false,
  });
  const dispatch = useAppDispatch();

  // on init ONLY, get recipes
  // then keep refreshing the state when recipes changes
  useEffect(() => {
    if (!isLoaded) {
      getRecipes();
      dispatch(setIsLoaded(true));
    }
  }, [recipes]);

  const getRecipes = async (): Promise<void> => {
    const query = new Parse.Query("recipe");
    await query.find().then(
      (results) => {
        dispatch(setRecipes(JSON.parse(JSON.stringify(results))));
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
      <RecCard
        search
        tags
        paddingLeft={0}
        height={450}
        selectedTags={(tags: FoodCategory[]) => dispatch(setTags(tags))}
      >
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

import Parse from 'parse/react-native';
import React, { useState } from 'react';

import RecActions from './RecActions';
import RecLoader from './RecLoader';

const RecRecipeActions = (props: any) => {
  const [recipe, setRecipe] = useState(props.recipe || {});
  const [isLoading, setIsLoading] = useState(false);

  const deleteRecipe = async () => {
    setIsLoading(true);
    var Recipe = Parse.Object.extend("recipe");
    var query = new Parse.Query(Recipe);
    query.equalTo("objectId", recipe.objectId);
    const currentRecipe = await query.first();
    if (currentRecipe) {
      currentRecipe.destroy().then(
        (results: any) => {
          setIsLoading(false);
          props.navigation.navigate("Recipes", {
            screen: "RecipesHome",
            params: {},
          });
        },
        (error: any) => {
          setIsLoading(false);
          console.log("[RecipesScreen] deleteRecipe error:", error);
          const { message, code } = JSON.parse(JSON.stringify(error));
          // setToast({
          //   isShowing: true,
          //   errorMessage: `${code} ${message}`,
          // });
        }
      );
    } else {
      setIsLoading(false);
    }
  };

  const handleClickedIcon = async (icon: string) => {
    switch (icon) {
      case "plus":
        props.navigation.navigate("Menus", {
          screen: "MenusHome",
          params: { recipe },
        });
        break;
      case "heart":
        console.log("toggle isFavorite for recipe in db (update)");
        break;
      case "flag":
        console.log("toggle isFlagged for recipe in db (update)");
        break;
      case "pen":
        console.log("send to addNew recipe page to (update/upsert)");
        break;
      case "trash":
        await deleteRecipe();
        break;
      default:
        break;
    }
  };

  return isLoading ? (
    <RecLoader />
  ) : (
    <RecActions
      iconSet="recipe"
      handleClick={(icon: string) => handleClickedIcon(icon)}
      {...props}
    />
  );
};

export default RecRecipeActions;

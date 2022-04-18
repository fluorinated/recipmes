import { Colors } from '@constants/colors';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { FoodCategory } from '@models/FoodCategory';
import { Recipe } from '@models/Recipe';
import RecCard from '@rec/RecCard';
import RecEmptyState from '@rec/RecEmptyState';
import RecInputLabel from '@rec/RecInputLabel';
import RecipeListEntry from '@screens/recipes/RecipeListEntry';
import RecLoader from 'components/rec/RecLoader';
import Parse from 'parse/react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MenuScreen = (props: any) => {
  const [menu, setMenu] = useState(props?.route?.params?.menu ?? undefined);

  useEffect(() => {
    setMenu(props?.route?.params?.menu);
  }, [props?.route?.params?.menu]);

  const deleteMenu = async () => {
    var Menu = Parse.Object.extend("menu");
    var query = new Parse.Query(Menu);
    query.equalTo("objectId", menu.objectId);
    const currentMenu = await query.first();

    if (currentMenu) {
      currentMenu.destroy().then(
        (results: any) => {
          props.navigation.navigate("Menus", {
            screen: "MenusHome",
            params: {},
          });
        },
        (error: any) => {
          console.log("[MenusScreen] deleteMenu error:", error);
          const { message, code } = JSON.parse(JSON.stringify(error));
          // setToast({
          //   isShowing: true,
          //   errorMessage: `${code} ${message}`,
          // });
        }
      );
    }
  };

  const includesCategoryMenu = (category: FoodCategory) => {
    const allRecipeCategories = menu.recipes
      .map((recipe: Recipe) => recipe?.categories || [])
      .flat();
    return allRecipeCategories.includes(category);
  };

  const includesCategory = (recipe: Recipe, category: FoodCategory) =>
    recipe?.categories?.includes(category);

  const Sections = () => {
    return (
      <View>
        {Object.values(FoodCategory).map((category, i) => (
          <View
            key={i}
            style={includesCategoryMenu(category) ? {} : styles.hidden}
          >
            <Text style={styles.title} key={i}>
              {category}
            </Text>
            {menu?.recipes?.map(
              (recipe: Recipe, index: number) =>
                includesCategory(recipe, category) && (
                  <View key={index}>
                    <RecipeListEntry
                      navigation={props.navigation}
                      recipe={recipe}
                      key={index}
                      isMenu
                    />
                  </View>
                )
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.background}>
      {/* <RecButton label="add ingredients to groceries" /> */}
      <RecInputLabel
        placeholder={menu?.title ?? "menu title"}
        inputTitle={menu?.title ?? "menu title"}
        handleDeleteClick={deleteMenu}
      />
      <RecCard paddingLeft={5} paddingRight={5} height={560}>
        {menu && menu?.recipes && menu?.recipes?.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <RecEmptyState
              icon={faBinoculars}
              header="no recipes added"
              subheader="browse recipes to add a recipe to a menu"
              handleClick={() => props.navigation.navigate("Recipes")}
              buttonLabel="browse recipes"
            />
          </View>
        )}
        {!menu && <RecLoader />}
        {menu && menu?.recipes && menu?.recipes?.length > 0 && <Sections />}
      </RecCard>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.neutral7,
  },
  hidden: {
    display: "none",
  },
  emptyStateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    paddingTop: 15,
    paddingBottom: 15,
    color: Colors.black,
    marginLeft: 15,
  },
  titleActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    display: "flex",
    marginTop: 10,
  },
  actions: {
    flexDirection: "row",
  },
  inputActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    display: "flex",
    marginTop: 10,
  },
});

export default MenuScreen;

import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import RecButton from "@rec/RecButton";
import { faBinoculars } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "@constants/colors";
import RecEmptyState from "@rec/RecEmptyState";
import RecInputLabel from "@rec/RecInputLabel";
import { FoodCategory } from "@models/FoodCategory";
import { Recipe } from "@models/Recipe";
import RecMiniCard from "@rec/RecMiniCard";
import { SafeAreaView } from "react-native-safe-area-context";

const MenuScreen = (props: any) => {
  const [menu, setMenu] = useState(props.route.params);

  const includesCategory = (recipe: Recipe, category: FoodCategory) =>
    recipe.categories?.includes(category);

  const getCategories = (category: FoodCategory) => {
    return (
      <View>
        {menu.recipes.map((recipe: Recipe, index: number) => (
          <View
            style={includesCategory(recipe, category) ? {} : styles.hidden}
            key={index}
          >
            <RecMiniCard
              navigation={props.navigation}
              recipe={recipe}
              key={index}
            />
          </View>
        ))}
      </View>
    );
  };

  const getSections = () => {
    return (
      <View>
        {Object.values(FoodCategory).map((category, i) => (
          <View key={i}>
            <Text style={styles.title} key={i}>
              {category}
            </Text>
            {getCategories(category)}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.background}>
      {false ? (
        <View style={styles.emptyStateContainer}>
          <RecEmptyState
            icon={faBinoculars}
            header="no recipes found"
            subheader="view a recipe and use the actions to add a recipe to a menu"
            handleClick={() => props.navigation.navigate("Recipes")}
            buttonLabel="view recipes"
          />
        </View>
      ) : (
        <SafeAreaView>
          <ScrollView>
            <RecButton label="add ingredients to groceries" />
            <RecInputLabel placeholder={menu.title} inputTitle="menu title" />
            <View>{getSections()}</View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    flex: 1,
    margin: 10,
    fontFamily: "Kailasa",
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

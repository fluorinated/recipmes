import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RecButton from "@rec/RecButton";
import { faBinoculars } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "@constants/colors";
import RecEmptyState from "@rec/RecEmptyState";
import RecInputLabel from "@rec/RecInputLabel";
import { Menu } from "@models/Menu";
import { FoodCategory } from "@models/FoodCategory";

const MenuScreen = ({ navigation }: any) => {
  return (
    <View style={styles.background}>
      {false ? (
        <View style={styles.emptyStateContainer}>
          <RecEmptyState
            icon={faBinoculars}
            header="no recipes found"
            subheader="view a recipe and use the actions to add a recipe to a menu"
            handleClick={() => navigation.navigate("Recipes")}
            buttonLabel="view recipes"
          />
        </View>
      ) : (
        <View>
          <RecButton label="add ingredients to groceries" />
          <RecInputLabel placeholder="menu title" inputTitle="menu title" />
          <View>
            {Object.keys(FoodCategory).map((category) => (
              <Text style={styles.title}>{category.toLowerCase()}</Text>
            ))}
          </View>
        </View>
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

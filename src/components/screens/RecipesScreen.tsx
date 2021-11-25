import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView, View, Text } from "react-native";
import RecMiniCard from "@rec/RecMiniCard";
import { Colors } from "@constants/colors";
import RecButton from "@rec/RecButton";
import Parse from "parse/react-native";
import RecToast from "@rec/RecToast";

const RecipesScreen = (props: any) => {
  const [recipes, setRecipes]: [any, any] = useState([]);
  const [toast, setToast]: [any, any] = useState({
    isShowing: props.route?.params?.isShowing || false,
    errorMessage: props.route?.params?.errorMessage || null,
    isError: props.route?.params?.isError || false,
  });

  useEffect(() => {
    getRecipe();
  });

  const getRecipe = async () => {
    const query = new Parse.Query("recipe");

    await query.find().then(
      (results) => {
        setRecipes(JSON.parse(JSON.stringify(results)));
        setToast({ isShowing: true, isError: false, errorMessage: null });
      },
      (error) => {
        console.log("[RecipesScreen] getRecipe error:", error);
        setToast({ isShowing: true, isError: true, errorMessage: error });
      }
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <RecToast
          message={toast.isError ? "error" : "success"}
          isShowing={toast.isShowing}
          isError={toast.isError}
          errorMessage={toast.errorMessage}
        />
        <RecButton
          handleClick={() => props.navigation.navigate("NewRecipe")}
          label="add new"
        />
        {recipes.map((recipe: any, index: number) => (
          <RecMiniCard
            navigation={props.navigation}
            recipe={recipe}
            key={index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    margin: 10,
    flex: 1,
    fontFamily: "Kailasa",
  },
});

export default RecipesScreen;

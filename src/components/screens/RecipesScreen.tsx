import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import RecMiniCard from "@rec/RecMiniCard";
import { Colors } from "@constants/colors";
import RecButton from "@rec/RecButton";
import Parse from "parse/react-native";
import { Recipe } from "@models/Recipe";

const RecipesScreen = ({ navigation }: any) => {
  const [recipes, setRecipes]: [any, any] = useState([]);

  useEffect(() => {
    getRecipe();
  }, []);

  const getRecipe = async () => {
    const query = new Parse.Query("recipe");

    query.find().then(
      (results) => {
        setRecipes(JSON.parse(JSON.stringify(results)));
      },
      (error) => {
        console.log("e", error);
      }
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <RecButton
          handleClick={() => navigation.navigate("NewRecipe")}
          label="add new"
        />
        {recipes.map((recipe: any, index: number) => (
          <RecMiniCard props={navigation} recipe={recipe} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    flex: 1,
    margin: 10,
    fontFamily: "Kailasa",
  },
});

export default RecipesScreen;

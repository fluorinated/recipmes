import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import RecipeMiniCard from "../rec/RecipeMiniCard";
import { Colors } from "../../constants/colors";
import RecButton from "../rec/RecButton";

const RecipesScreen = ({ navigation }: any) => {
  // const getRecipe = async () => {
  //   const parseQuery = new Parse.Query("GameScore");

  //   console.log("get recipe");

  //   try {
  //     let results = await parseQuery.find();
  //     console.log("got it", results);
  //     return true;
  //   } catch (e) {
  //     console.log("e", e);
  //     return false;
  //   }
  // };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <RecButton
          handleClick={() => navigation.navigate("NewRecipe")}
          label="add new"
        />
        <RecipeMiniCard props={navigation} />
        <RecipeMiniCard props={navigation} />
        <RecipeMiniCard props={navigation} />
        <RecipeMiniCard props={navigation} />
        <RecipeMiniCard props={navigation} />
        <RecipeMiniCard props={navigation} />
        <RecipeMiniCard props={navigation} />
        <RecipeMiniCard props={navigation} />
        <RecipeMiniCard props={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    flex: 1,
  },
});

export default RecipesScreen;

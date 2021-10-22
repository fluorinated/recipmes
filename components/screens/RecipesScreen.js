import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import RecipeMiniCard from "../RecipeMiniCard";
import { Colors } from "../../colors";
import RecButton from "../RecButton";

const RecipesScreen = ({ navigation }) => {
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

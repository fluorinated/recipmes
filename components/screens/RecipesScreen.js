import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RecipeMiniCard from "../RecipeMiniCard";
import { Colors } from "../../colors";

const RecipesScreen = ({ navigation }) => {
  return (
    <View style={styles.background}>
      <View style={styles.addNewContainer}>
        <TouchableOpacity
          style={styles.addNewButton}
          onPress={() => navigation.navigate("NewRecipe")}
        >
          <Text style={styles.addNewText}>add new</Text>
        </TouchableOpacity>
      </View>

      <RecipeMiniCard props={navigation} />
      <RecipeMiniCard props={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    flex: 1,
    alignItems: "center",
  },
  addNewContainer: {
    backgroundColor: Colors.neutral7,
    padding: 10,
    display: "flex",
    marginTop: 10,
    width: "90%",
  },
  addNewButton: {
    backgroundColor: Colors.purple1,
    padding: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  addNewText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Kailasa",
  },
});

export default RecipesScreen;

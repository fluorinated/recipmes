import React from "react";
import { StyleSheet, Text, View } from "react-native";

const IngredientsScreen = () => {
  return (
    <View>
      <Text>Ingredients Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#656565",
    marginTop: 65,
  },
  container: {
    flex: 1,
  },
});

export default IngredientsScreen;

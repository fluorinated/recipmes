import { Colors } from "@constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const IngredientsScreen = () => {
  return (
    <View style={styles.background}>
      <Text>Ingredients Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    flex: 1,
    margin: 10,
  },
});

export default IngredientsScreen;

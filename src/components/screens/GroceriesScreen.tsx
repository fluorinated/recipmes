import { Colors } from "@constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GroceriesScreen = () => {
  return (
    <View style={styles.background}>
      <Text>Groceries Screen</Text>
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

export default GroceriesScreen;

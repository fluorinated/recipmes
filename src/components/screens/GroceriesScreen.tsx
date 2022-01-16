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
    flex: 1,
    backgroundColor: Colors.neutral7,
    margin: 10,
  },
});

export default GroceriesScreen;
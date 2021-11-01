import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@constants/colors";

const RecButton = (props: any) => {
  return (
    <View style={styles.addNewContainer}>
      <TouchableOpacity
        style={styles.addNewButton}
        onPress={() => props.handleClick()}
      >
        <Text style={styles.addNewText}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addNewContainer: {
    backgroundColor: Colors.neutral7,
    padding: 10,
    display: "flex",
    marginTop: 10,
    width: "100%",
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

export default RecButton;

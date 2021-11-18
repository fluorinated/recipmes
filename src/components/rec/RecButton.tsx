import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "@constants/colors";

const RecButton = (props: any) => {
  return (
    <View
      style={
        props.type === "secondary"
          ? secondaryStyles.container
          : primaryStyles.container
      }
    >
      <TouchableOpacity
        style={
          props.type === "secondary"
            ? secondaryStyles.button
            : primaryStyles.button
        }
        onPress={() => props.handleClick()}
      >
        <Text
          style={
            props.type === "secondary"
              ? secondaryStyles.text
              : primaryStyles.text
          }
        >
          {props.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const primaryStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral7,
    display: "flex",
    width: "100%",
  },
  button: {
    backgroundColor: Colors.purple1,
    padding: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Kailasa",
  },
});

const secondaryStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral7,
    display: "flex",
  },
  button: {
    backgroundColor: Colors.neutral6,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: Colors.neutral1,
    fontSize: 15,
    fontFamily: "Kailasa",
  },
});

export default RecButton;

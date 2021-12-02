import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Colors } from "@constants/colors";

const RecInput = (props: any) => {
  const getSize = () => {
    if (props.size === "half") {
      return 190;
    } else if (props.size === "third") {
      return 260;
    } else {
      return 390;
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        { marginRight: props.marginRight, width: props.width || getSize() },
      ]}
    >
      <Text style={props.title ? styles.inputTitle : styles.hidden}>
        {props.title}
      </Text>
      <TextInput
        style={[
          styles.input,
          props.backgroundColor
            ? { backgroundColor: props.backgroundColor }
            : {},
        ]}
        placeholder={props.placeholder}
        placeholderTextColor={
          props.placeholderTextColor
            ? props.placeholderTextColor
            : Colors.neutral2
        }
        onChangeText={(text) => props.handleChangeText(text)}
        keyboardType={props.keyboardType}
        value={props.value}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  inputTitle: {
    color: Colors.neutral1,
    marginTop: 10,
    marginLeft: 5,
    fontFamily: "Kailasa",
    width: "100%",
  },
  input: {
    height: 50,
    marginTop: 10,
    backgroundColor: Colors.neutral6,
    color: Colors.neutral1,
    padding: 10,
    borderRadius: 8,
    width: "100%",
    fontFamily: "Kailasa",
  },
  inputContainer: {
    alignItems: "flex-start",
  },
});

export default RecInput;

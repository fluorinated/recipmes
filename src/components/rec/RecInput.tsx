import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Colors } from "@constants/colors";

const RecInput = (props: any) => {
  const getSize = (): number => {
    switch (props.size) {
      case "half":
        return 190;
      case "third":
        return 260;
      default:
        return 390;
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        props.marginRight && { marginRight: props.marginRight },
        { width: props.width ?? getSize() },
      ]}
    >
      <Text style={props.title ? styles.inputTitle : styles.hidden}>
        {props.title}
      </Text>
      <TextInput
        style={[
          styles.input,
          props.backgroundColor && { backgroundColor: props.backgroundColor },
        ]}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor ?? Colors.neutral2}
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
    width: "100%",
    color: Colors.neutral1,
    marginTop: 10,
    marginLeft: 5,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.neutral6,
    color: Colors.neutral1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  inputContainer: {
    alignItems: "flex-start",
  },
});

export default RecInput;

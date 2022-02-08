import { Colors } from '@constants/colors';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

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
      {props.date ? (
        <MaskedTextInput
          style={[
            styles.input,
            props.backgroundColor && { backgroundColor: props.backgroundColor },
          ]}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor ?? Colors.neutral2}
          onChangeText={(text, rawText) => props.handleChangeText(text)}
          keyboardType={props.keyboardType}
          value={props.value}
          mask="99/99/9999"
        ></MaskedTextInput>
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  inputTitle: {
    color: Colors.neutral1,
    width: "100%",
    marginLeft: 5,
  },
  input: {
    backgroundColor: Colors.neutral6,
    color: Colors.neutral1,
    borderRadius: 8,
    width: "100%",
    height: 45,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  inputContainer: {
    alignItems: "flex-start",
  },
});

export default RecInput;

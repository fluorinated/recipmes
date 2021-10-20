import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Colors} from '../colors';

const RecInput = props => {
  return (
    <View
      style={[
        styles.inputContainer,
        {width: props.width},
        {marginRight: props.marginRight},
      ]}>
      <Text style={props.title ? styles.inputTitle : styles.hidden}>
        {props.title}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.neutral2}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
  inputTitle: {
    color: Colors.neutral1,
    marginTop: 10,
    marginLeft: 5,
    fontFamily: 'Kailasa',
    width: '100%',
  },
  input: {
    height: 50,
    marginTop: 10,
    backgroundColor: Colors.neutral5,
    color: Colors.neutral1,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    fontFamily: 'Kailasa',
  },
  inputContainer: {
    alignItems: 'flex-start',
  },
});

export default RecInput;

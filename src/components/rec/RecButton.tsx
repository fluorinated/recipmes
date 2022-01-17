import { Colors } from '@constants/colors';
import { DMSans_400Regular, useFonts } from '@expo-google-fonts/dm-sans';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RecButton = (props: any) => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
  });
  // useEffect(() => {}, [fontsLoaded]);

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
          style={[
            fontsLoaded && { fontFamily: "DMSans_400Regular" },
            props.type === "secondary"
              ? secondaryStyles.text
              : primaryStyles.text,
          ]}
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
    width: "90%",
    margin: 20,
  },
  button: {
    backgroundColor: Colors.pink4,
    padding: 20,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.pink2,
    shadowColor: Colors.pink3,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    textShadowRadius: 1,
  },
  text: {
    color: Colors.black,
    fontSize: 22,
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
  },
});

export default RecButton;

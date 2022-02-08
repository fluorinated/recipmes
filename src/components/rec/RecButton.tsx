import { Colors } from '@constants/colors';
import { DMSans_400Regular, useFonts } from '@expo-google-fonts/dm-sans';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RecButton = (props: any) => {
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
  });
  // useEffect(() => {}, [fontsLoaded]);

  const getStyles = () => {
    switch (props.type) {
      case "primary":
        return primaryStyles;
      case "secondary":
        return secondaryStyles;
      case "tertiary":
        return tertiaryStyles;
      default:
        return primaryStyles;
    }
  };

  return (
    <View style={getStyles().container}>
      <TouchableOpacity style={getStyles().button} onPress={props.handleClick}>
        {props.icon && (
          <FontAwesomeIcon icon={props.icon} color={Colors.neutral1} />
        )}
        <Text
          style={[
            fontsLoaded && { fontFamily: "DMSans_400Regular" },
            getStyles().text,
            props.icon && { paddingLeft: 10 },
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
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.pink4,
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.pink3,
    shadowColor: Colors.pink3,
    shadowOffset: {
      width: -1,
      height: 1,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.neutral6,
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    padding: 15,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.neutral4,
    shadowOpacity: 0.5,
    shadowRadius: 0.25,
    shadowOffset: {
      width: -0.5,
      height: 0.5,
    },
  },
  text: {
    color: Colors.neutral2,
    fontSize: 16,
  },
});

const tertiaryStyles = StyleSheet.create({
  container: {
    display: "flex",
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.neutral7,
    borderRadius: 5,
    padding: 15,
  },
  text: {
    color: Colors.neutral2,
    fontSize: 16,
  },
});

export default RecButton;

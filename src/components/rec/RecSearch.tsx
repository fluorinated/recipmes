import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@constants/colors";

import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const RecSearch = (props: any) => {
  const [height, setHeight] = useState(0);
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  return (
    <View
      style={styles.container}
      onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
    >
      <FontAwesomeIcon
        icon={faSearch}
        style={styles.icon}
        size={props.size || 23}
        color={props.color || Colors.neutral2}
      />
      <TextInput
        style={[
          styles.input,
          fontsLoaded ? { fontFamily: "Inter_400Regular" } : {},
        ]}
        placeholderTextColor={Colors.neutral2}
        placeholder={props.label}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    display: "flex",
    width: "95%",
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  button: {
    backgroundColor: Colors.yellow5,
    padding: 20,
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.yellow3,
    shadowColor: Colors.yellow1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    textShadowRadius: 5,
  },
  input: {
    color: Colors.neutral1,
    fontSize: 22,
    width: "85%",
    height: 30,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default RecSearch;

import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const getTheme = (props: any) => {
  return props.dark ? styles.darkBg : styles.lightBg;
};

const RecIconButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.handleClick}>
      <View
        style={[
          styles.container,
          getTheme(props),
          { marginRight: props.margin },
        ]}
      >
        <FontAwesomeIcon
          icon={props.icon}
          style={getTheme(props)}
          size={props.size ?? 23}
          color={props.color ?? Colors.neutral1}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
  },
  lightBg: {
    backgroundColor: Colors.neutral7,
  },
  darkBg: {
    backgroundColor: Colors.neutral6,
  },
});

export default RecIconButton;

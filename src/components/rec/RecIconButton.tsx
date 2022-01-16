import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const RecIconButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.handleClick}>
      <View style={[styles.actionContainer, { marginRight: props.margin }]}>
        <FontAwesomeIcon
          icon={props.icon}
          style={styles.action}
          size={props.size ?? 23}
          color={props.color ?? Colors.neutral1}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  action: {
    backgroundColor: Colors.neutral6,
  },
  actionContainer: {
    backgroundColor: Colors.neutral6,
    padding: 10,
    borderRadius: 10,
  },
});

export default RecIconButton;

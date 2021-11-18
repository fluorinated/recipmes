import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const RecIconButton = (props: any) => {
  return (
    <TouchableOpacity onPress={props.handleClick}>
      <View style={styles.actionContainer}>
        <FontAwesomeIcon
          icon={props.icon}
          style={styles.action}
          size={props.size}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  action: {
    backgroundColor: Colors.neutral5,
  },
  actionContainer: {
    backgroundColor: Colors.neutral5,
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default RecIconButton;

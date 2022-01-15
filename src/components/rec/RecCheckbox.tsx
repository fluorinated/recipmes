import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "@constants/colors";

const RecCheckbox = (props: any) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    props.isChecked(isChecked);
  }, [isChecked]);

  const onPress = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity
        style={
          isChecked
            ? [styles.checkbox, styles.checked]
            : [styles.checkbox, styles.unchecked]
        }
        onPress={onPress}
      >
        <FontAwesomeIcon
          style={isChecked ? {} : styles.hidden}
          color={Colors.white}
          icon={faCheck}
        />
      </TouchableOpacity>
      <Text style={props.label ? styles.label : styles.hidden}>
        {props.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  label: {
    color: Colors.neutral1,
    width: "100%",
  },
  checkbox: {
    height: 30,
    width: 30,
    color: Colors.neutral1,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  checked: {
    backgroundColor: Colors.pink1,
  },
  unchecked: {
    backgroundColor: Colors.neutral5,
  },
});

export default RecCheckbox;

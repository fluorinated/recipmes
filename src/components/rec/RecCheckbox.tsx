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

  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          !isChecked && !props.dark && styles.unchecked,
          !isChecked && props.dark && styles.uncheckedDark,
          isChecked && styles.checked,
        ]}
        onPress={() => setIsChecked(!isChecked)}
      >
        <FontAwesomeIcon
          color={Colors.yellow1}
          icon={faCheck}
          style={isChecked ? {} : styles.hidden}
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
    width: "100%",
    color: Colors.neutral1,
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
    color: Colors.neutral1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    marginRight: 10,
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  checked: {
    backgroundColor: Colors.pink4,
  },
  unchecked: {
    backgroundColor: Colors.neutral7,
    borderWidth: 1,
    borderColor: Colors.neutral5,
  },
  uncheckedDark: {
    backgroundColor: Colors.neutral5,
  },
});

export default RecCheckbox;

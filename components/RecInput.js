import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const RecInput = (props) => {
  const [inputs, setInputs] = useState(Array.from(Array(1).keys()));

  const onClickPlus = (num) => {
    setInputs([...inputs, num + 1]);
  };

  const onClickMinus = (num) => {
    const filteredInputs = inputs.filter((input, index) => input !== num);
    setInputs(filteredInputs);
  };

  return (
    <View style={[styles.inputContainer, { marginRight: props.marginRight }]}>
      {inputs.map((num, index) => {
        return (
          <View
            style={{ width: props.size === "half" ? 180 : 370 }}
            key={`input-${num}`}
          >
            <Text style={props.title ? styles.inputTitle : styles.hidden}>
              {num === 0 ? props.title : `${props.title} ${num + 1}`}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                num === 0
                  ? props.placeholder
                  : `${props.placeholder} ${num + 1}`
              }
              placeholderTextColor={Colors.neutral2}
            ></TextInput>
            <TouchableOpacity
              style={props.isMany ? styles.minusContainer : styles.hidden}
              onPress={() => onClickMinus(num)}
            >
              <FontAwesomeIcon icon={faMinus} style={styles.action} />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                props.isMany && index === inputs.length - 1
                  ? styles.plusContainer
                  : styles.hidden
              }
              onPress={() => onClickPlus(num)}
            >
              <FontAwesomeIcon icon={faPlus} style={styles.action} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  inputTitle: {
    color: Colors.neutral1,
    marginTop: 10,
    marginLeft: 5,
    fontFamily: "Kailasa",
    width: "100%",
  },
  input: {
    height: 50,
    marginTop: 10,
    backgroundColor: Colors.neutral5,
    color: Colors.neutral1,
    padding: 10,
    borderRadius: 8,
    width: "100%",
    fontFamily: "Kailasa",
  },
  inputContainer: {
    alignItems: "flex-start",
  },
  action: {
    color: Colors.neutral1,
  },
  plusContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  minusContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    padding: 10,
  },
});

export default RecInput;

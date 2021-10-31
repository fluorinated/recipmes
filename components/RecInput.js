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
import RecSelect from "./RecSelect";

const RecInput = (props) => {
  const [inputs, setInputs] = useState(Array.from(Array(1).keys()));
  const [inputTexts, setInputTexts] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    props.isMany
      ? props.handleChangeText(inputTexts)
      : props.handleChangeText(inputTexts[0]);

    if (props.isIngredients) {
      let finalIngredients = [...ingredients];
      finalIngredients = finalIngredients.map((obj, i) => ({
        ...obj,
        title: inputTexts[i],
      }));
      props.ingredients(finalIngredients);
    }
  }, [inputTexts, ingredients]);

  const onClickPlus = (num) => {
    setInputs([...inputs, num + 1]);
  };

  const onClickMinus = (num, index) => {
    const filteredInputs = inputs.filter((input, index) => input !== num);
    setInputs(filteredInputs);
    let newInputTexts = [...inputTexts].filter((input, i) => i !== index);
    setInputTexts(newInputTexts);
    let newIngredients = [...ingredients].filter((input, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleChangeText = (text, index) => {
    let newInputTexts = [...inputTexts];
    newInputTexts[index] = text;
    setInputTexts(newInputTexts);
  };

  const handleSetIngredients = (text, index, input) => {
    let newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [input]: text };
    setIngredients(newIngredients);
  };

  const showIngredientsInputs = (index) => {
    if (props.isIngredients) {
      return (
        <View style={styles.row}>
          <RecInput
            placeholder="amount"
            title="amount"
            size="half"
            marginRight={10}
            handleChangeText={(text) =>
              handleSetIngredients(text, index, "amount")
            }
          />
          <RecSelect
            placeholder="units"
            title="units"
            size="half"
            selectedValue={(val) => handleSetIngredients(val, index, "unit")}
          />
        </View>
      );
    }
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
              onChangeText={(text) => handleChangeText(text, index)}
            ></TextInput>
            {showIngredientsInputs(index)}
            <TouchableOpacity
              style={props.isMany ? styles.minusContainer : styles.hidden}
              onPress={() => onClickMinus(num, index)}
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
  row: {
    flexDirection: "row",
  },
});

export default RecInput;

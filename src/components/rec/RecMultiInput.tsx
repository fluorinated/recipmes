import { Colors } from '@constants/colors';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Ingredient } from '@models/Ingredient';
import { Unit } from '@models/Unit';
import RecCheckbox from '@rec/RecCheckbox';
import RecIconButton from '@rec/RecIconButton';
import RecInput from '@rec/RecInput';
import RecSelect from '@rec/RecSelect';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const RecMultiInput = (props: any) => {
  const [inputs, setInputs]: [number[], any] = useState(
    Array.from(Array(1).keys())
  );
  const [inputTexts, setInputTexts]: [string[], any] = useState([]);
  const [ingredients, setIngredients]: [Ingredient[], any] = useState([]);

  useEffect(() => {
    if (props.isIngredients) {
      let finalIngredients: Ingredient[] = [...ingredients];
      finalIngredients = finalIngredients.map((obj, i) => ({
        ...obj,
        title: inputTexts[i],
      }));
      props.ingredients(finalIngredients);
    } else {
      props.handleChangeText(inputTexts);
    }
  }, [inputTexts, ingredients]);

  const onClickPlus = (num: number): void => {
    setInputs([...inputs, num + 1]);
  };

  const onClickMinus = (num: number, index: number): void => {
    const filteredInputs = inputs.filter((input) => input !== num);
    setInputs(filteredInputs);
    let newInputTexts = [...inputTexts].filter((_, i) => i !== index);
    setInputTexts(newInputTexts);
    let newIngredients = [...ingredients].filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleChangeText = (text: string, index: number): void => {
    let newInputTexts = [...inputTexts];
    newInputTexts[index] = text;
    setInputTexts(newInputTexts);
  };

  const handleSetIngredients = (
    val: any,
    index: number,
    input: string
  ): void => {
    let newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [input]: val };
    setIngredients(newIngredients);
  };

  const showIngredientsInputs = (index: number) => {
    if (props.isIngredients) {
      return (
        <View>
          <View style={styles.row}>
            <RecInput
              placeholder="amount"
              title="amount"
              marginRight={10}
              handleChangeText={(text: string) =>
                handleSetIngredients(text, index, "amount")
              }
              width={180}
            />
            <RecSelect
              placeholder="units"
              title="units"
              selectedValue={(val: Unit) =>
                handleSetIngredients(val, index, "unit")
              }
              width={180}
            />
          </View>
          <View
            style={
              props.isGroceries || props.isNewRecipe
                ? { display: "none" }
                : styles.row
            }
          >
            <View
              style={{
                width: 180,
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 10,
              }}
            >
              <RecCheckbox
                label="running low"
                isChecked={(isChecked: boolean) =>
                  handleSetIngredients(isChecked, index, "isRunningLow")
                }
                dark
              />
            </View>
            <RecInput
              placeholder="mm/dd/yyyy"
              title="expiration"
              handleChangeText={(text: string) =>
                handleSetIngredients(text, index, "expirationDate")
              }
              width={180}
              keyboardType="numeric"
              date
            />
          </View>
        </View>
      );
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        props.marginRight && { marginRight: props.marginRight },
      ]}
    >
      {inputs.map((num, index) => {
        return (
          <View key={index}>
            <View style={props.isIngredients && styles.ingredientContainer}>
              <RecInput
                placeholder={
                  num === 0
                    ? props.placeholder
                    : `${props.placeholder} ${num + 1}`
                }
                title={num === 0 ? props.title : `${props.title} ${num + 1}`}
                size={props.size}
                handleChangeText={(text: string) =>
                  handleChangeText(text, index)
                }
                keyboardType={props.keyboardType}
                value={props.value}
                width={props.isIngredients ? 370 : undefined}
              />

              {showIngredientsInputs(index)}
              <TouchableOpacity
                style={
                  inputs.length > 1 ? styles.minusContainer : styles.hidden
                }
              >
                <RecIconButton
                  icon={faMinus}
                  size={20}
                  handleClick={() => onClickMinus(num, index)}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={
                index === inputs.length - 1 && !props.hidePlus
                  ? styles.plusContainer
                  : styles.hidden
              }
            >
              <RecIconButton
                icon={faPlus}
                size={20}
                handleClick={() => onClickPlus(num)}
              />
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
  inputContainer: {
    alignItems: "flex-start",
  },
  plusContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 10,
  },
  minusContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  ingredientContainer: {
    display: "flex",
    alignItems: "center",
    borderColor: Colors.neutral5,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingBottom: 15,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default RecMultiInput;

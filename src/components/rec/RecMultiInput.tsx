import { Colors } from '@constants/colors';
import { faChevronLeft, faChevronRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Ingredient } from '@models/Ingredient';
import { Unit } from '@models/Unit';
import RecCheckbox from '@rec/RecCheckbox';
import RecIconButton from '@rec/RecIconButton';
import RecInput from '@rec/RecInput';
import RecSelect from '@rec/RecSelect';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import RecCard from './RecCard';

const RecMultiInput = (props: any) => {
  const [inputs, setInputs]: [number[], any] = useState(
    Array.from(Array(1).keys())
  );
  const [inputTexts, setInputTexts]: [string[], any] = useState([]);
  const [ingredients, setIngredients]: [Ingredient[], any] = useState([]);
  const [isSearchFoodShowing, setIsSearchFoodShowing]: [boolean, any] =
    useState(false);
  const [foodData, setFoodData]: [any, any] = useState({});
  const [pageNumber, setPageNumber]: [number, any] = useState(0);
  const foodInputRef = useRef();
  const searchDialogRef = useRef();

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
  }, [inputTexts, ingredients, foodData]);

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

  const fetchIngredients = async (searchTerm: string) => {
    // to-do: incorporate tags into search
    var key = "kEwDWWxmfPAlTDc7IOi5aPrPLBkmDxYKEEFaXyVg";
    var fid = 2065531;
    var baseUrl = "https://api.nal.usda.gov/fdc/v1";
    var apiKey = `?api_key=${key}`;
    var url2 = `${baseUrl}/foods/search${apiKey}&query=${searchTerm}&pageNumber=${pageNumber}`;
    // var URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}&query=${searchTerm}`;
    fetch(url2)
      .then((response) => response.json())
      .then((json) => {
        // console.log("response api =>", json);
        setFoodData(json);
      })
      .catch((err) => console.log("error: ", err));
  };

  const handleChangeText = (text: string, index: number): void => {
    if (index === 0) {
      if (props.isIngredients) {
        fetchIngredients(text);
      }
      setPageNumber(0);
    }
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

  const handlePressInInput = (index: number) => {
    if (index === 0) {
      setIsSearchFoodShowing(props.isIngredients && true);
    } else {
      setIsSearchFoodShowing(false);
    }
  };

  const handleTagClick = (foodObject) => {
    let newInputTexts = [...inputTexts];
    newInputTexts[0] = foodObject.description;
    setInputTexts(newInputTexts);
    setIsSearchFoodShowing(false);
  };

  const displayFood = () => {
    if (foodData?.foods) {
      return (
        <TouchableOpacity style={styles.foodTagsContainer}>
          {foodData?.foods?.map((food, i) => (
            <TouchableOpacity
              style={styles.foodTag}
              key={i}
              onPressIn={() => handleTagClick(food)}
            >
              <Text>{food.description}</Text>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      );
    }
  };

  const getPreviousPage = () => {
    const foodText = inputTexts[0];
    setPageNumber(pageNumber - 1);
    fetchIngredients(foodText);
  };

  const getNextPage = () => {
    const foodText = inputTexts[0];
    setPageNumber(pageNumber + 1);
    fetchIngredients(foodText);
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
                handlePressIn={() => handlePressInInput(index)}
                keyboardType={props.keyboardType}
                value={inputTexts[0] && num === 0 ? inputTexts[0] : props.value}
                width={props.isIngredients ? 370 : undefined}
              />
              {isSearchFoodShowing && (
                <RecCard
                  ref={searchDialogRef}
                  tags
                  paddingLeft={0}
                  height={450}
                  width={"97%"}
                  marginLeft={"-5%"}
                >
                  <View style={styles.topTagsContainer}>
                    <Text style={styles.pageNumber}>
                      page {foodData?.currentPage ?? 0}
                    </Text>
                    <Text style={styles.totalHits}>
                      {foodData?.totalHits ?? 0} results found
                    </Text>
                  </View>
                  <View>{displayFood()}</View>
                  <View style={styles.paginationContainer}>
                    <RecIconButton
                      icon={faChevronLeft}
                      handleClick={getPreviousPage}
                      dark
                      marginRight={70}
                    />
                    <RecIconButton
                      icon={faChevronRight}
                      handleClick={getNextPage}
                      dark
                    />
                  </View>
                </RecCard>
              )}

              {!isSearchFoodShowing && showIngredientsInputs(index)}

              <TouchableOpacity
                style={
                  inputs.length > 1 && !isSearchFoodShowing
                    ? styles.minusContainer
                    : styles.hidden
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
                index === inputs.length - 1 &&
                !props.hidePlus &&
                !isSearchFoodShowing
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
  totalHits: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 3,
    backgroundColor: Colors.neutral7,
    color: Colors.neutral2,
  },
  topTagsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  pageNumber: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 3,
    backgroundColor: Colors.neutral7,
    color: Colors.neutral2,
  },
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
  foodTag: {
    paddingHorizontal: 7,
    paddingVertical: 13,
    borderRadius: 5,
    backgroundColor: Colors.pink7,
    color: Colors.yellow1,
    marginHorizontal: 3,
    marginVertical: 2,
  },
  foodTagsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default RecMultiInput;

import { Colors } from '@constants/colors';
import { useAppDispatch } from '@hooks/redux-hooks';
import RecListEntryClick from 'components/rec/RecListEntryClick';
import { Ingredient } from 'models/Ingredient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

const RecFoodListEntry = (props: any) => {
  // const recipe: Recipe = useAppSelector(selectCurrentRecipe);
  // const recipes: Recipe = useAppSelector(selectCurrentRecipe);
  const [food, setFood]: [Ingredient, any] = useState(props?.food || {});
  const [areActionsShown, setAreActionsShown]: [any, any] = useState(false);
  const [cardHeight, setCardHeight]: [any, any] = useState(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchFood();
  }, []);

  const toggleActionsVisibility = (): void => {
    setAreActionsShown(!areActionsShown);
  };

  const setInitialCardHeight = (height: number) => {
    if (!cardHeight) {
      setCardHeight(height);
    }
  };

  const displayFood = () => {
    if (food) {
      return <Text>hi</Text>;
    }
  };

  const fetchFood = async () => {
    console.log("fetching");
    var searchTerm = "artichoke";
    var key = "kEwDWWxmfPAlTDc7IOi5aPrPLBkmDxYKEEFaXyVg";
    var fid = 2065531;
    var baseUrl = "https://api.nal.usda.gov/fdc/v1";
    var apiKey = `?api_key=${key}`;
    var url1 = `${baseUrl}/food/${fid}${apiKey}`;
    // var URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}&query=${searchTerm}`;
    fetch(url1)
      .then((response) => response.json())
      .then((json) => {
        // console.log("response api =>", json);
        setFood(JSON.stringify(json));
        return json.movies;
      })
      .catch((err) => console.log("error: ", err));
  };

  return (
    <RecListEntryClick
      inlineBtn={true}
      handlePressIn={() => (props.handlePressIn ? props.handlePressIn() : {})}
    >
      <Text style={styles.header} ellipsizeMode="tail" numberOfLines={2}>
        {displayFood()}
      </Text>
    </RecListEntryClick>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  card: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    borderBottomColor: Colors.neutral7,
    borderBottomWidth: 1,
    width: 420,
    paddingVertical: 15,
  },
  actions: {
    width: "100%",
    justifyContent: "center",
  },
  header: {
    width: 180,
    fontSize: 23,
    color: Colors.black,
    fontFamily: "Medium",
    paddingLeft: 15,
  },
  subHeader: {
    alignSelf: "center",
    fontSize: 15,
    color: Colors.neutral1,
    fontFamily: "Regular",
  },
});

export default RecFoodListEntry;

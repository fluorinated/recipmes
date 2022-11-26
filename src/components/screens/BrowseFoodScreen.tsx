import { Colors } from '@constants/colors';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import RecCard from '@rec/RecCard';
import RecEmptyState from 'components/rec/RecEmptyState';
import RecLoader from 'components/rec/RecLoader';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { setIsLoaded, setSearchedText } from 'store/recipes/recipes.reducer';
import { selectIsLoaded } from 'store/recipes/recipes.selectors';

import BrowseFoodListEntry from './browse-food/BrowseFoodListEntry';

const BrowseFoodScreen = (props: any) => {
  const [foodData, setFoodData]: [any, any] = useState({});
  const [searchedText, setSearchedText]: [string, any] = useState("");
  const [tagList, setTagList]: [string[], any] = useState([""]);
  const [selectedTags, setSelectedTags]: [string[], any] = useState([""]);
  const isLoaded: boolean = useAppSelector(selectIsLoaded);
  const [toast, setToast]: [any, any] = useState({
    isShowing: props.route?.params?.isShowing ?? false,
    errorMessage: props.route?.params?.errorMessage ?? null,
    isError: props.route?.params?.isError ?? false,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoaded) {
      setSearchedText("apple");
      fetchFood();
    }
  }, [foodData]);

  const fetchFood = async () => {
    // to-do: incorporate tags into search
    let pageNumber = 1;
    var key = "kEwDWWxmfPAlTDc7IOi5aPrPLBkmDxYKEEFaXyVg";
    var fid = 2065531;
    var baseUrl = "https://api.nal.usda.gov/fdc/v1";
    var apiKey = `?api_key=${key}`;
    var url2 = `${baseUrl}/foods/search${apiKey}&query=${searchedText}&pageNumber=${pageNumber}`;
    // var URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${key}&query=${searchTerm}`;
    fetch(url2)
      .then((response) => response.json())
      .then((json) => {
        setFoodData(json?.foods);
        const tags = Array.from(
          new Set(json?.foods?.map((food) => food?.foodCategory))
        ).filter((obj) => !!obj);
        console.log("tags", tags);
        setTagList(tags);
        setIsLoaded(true);
      })
      .catch((err) => console.log("error: ", err));
  };

  const handlePressIn = (food: any) => {
    props.navigation.navigate("BrowseFood", {
      screen: "Food",
      params: { food },
    });
  };

  const textSearched = async (text: string) => {
    setSearchedText(text);
    await fetchFood();
  };

  return (
    <View style={styles.background}>
      <RecCard
        search
        tags
        paddingLeft={0}
        height={600}
        selectedTags={(tags: string[]) => setSelectedTags(tags)}
        searchedText={(text: string) => textSearched(text)}
        tagList={tagList}
      >
        {foodData && foodData?.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <RecEmptyState
              icon={faBinoculars}
              header="no recipes found"
              subheader="add a new recipe or adjust your search"
              buttonLabel="add recipe"
            />
          </View>
        )}

        {!foodData && <RecLoader />}

        {foodData &&
          foodData?.length > 0 &&
          foodData.map((food: any, i: number) => (
            <BrowseFoodListEntry
              navigation={props.navigation}
              food={food}
              key={i}
              handlePressIn={() => handlePressIn(food)}
            />
          ))}
      </RecCard>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.neutral7,
  },
  emptyStateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BrowseFoodScreen;

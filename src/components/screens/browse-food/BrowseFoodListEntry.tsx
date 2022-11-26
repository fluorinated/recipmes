import { Colors } from '@constants/colors';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@hooks/redux-hooks';
import RecIconButton from 'components/rec/RecIconButton';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const BrowseFoodListEntry = (props: any) => {
  // const recipe: Recipe = useAppSelector(selectCurrentRecipe);
  // const recipes: Recipe = useAppSelector(selectCurrentRecipe);
  const [food, setFood] = useState(props.food || {});
  const [isDescriptionShown, setIsDescriptionShown]: [any, any] =
    useState(false);
  const [cardHeight, setCardHeight]: [any, any] = useState(null);

  const dispatch = useAppDispatch();

  const toggleDescriptionVisibility = (): void => {
    setIsDescriptionShown(!isDescriptionShown);
  };

  const setInitialCardHeight = (height: number) => {
    if (!cardHeight) {
      setCardHeight(height);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header} ellipsizeMode="tail" numberOfLines={3}>
          {food?.description.toLowerCase()}
        </Text>
        <RecIconButton
          icon={faChevronRight}
          color={Colors.neutral4}
          size={16}
          handleClick={() => (props.handlePressIn ? props.handlePressIn() : {})}
          marginLeft={15}
          marginTop={10}
          style={styles.chevron}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  header: {
    width: 300,
    fontSize: 23,
    color: Colors.black,
    fontFamily: "Medium",
  },
  subHeader: {
    alignSelf: "flex-start",
    fontSize: 15,
    color: Colors.neutral1,
    fontFamily: "Regular",
    borderRadius: 5,
    margin: 3,
    padding: 5,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 270,
    maxWidth: 270,
    paddingBottom: 5,
    marginLeft: 15,
  },
  chevron: {
    display: "flex",
  },
  container: {
    display: "flex",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
});

export default BrowseFoodListEntry;

import { Colors } from '@constants/colors';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAppDispatch } from '@hooks/redux-hooks';
import RecTagList from '@rec/RecTagList';
import RecListEntryClick from 'components/rec/RecListEntryClick';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const RecipeListEntry = (props: any) => {
  // const recipe: Recipe = useAppSelector(selectCurrentRecipe);
  // const recipes: Recipe = useAppSelector(selectCurrentRecipe);
  const [recipe, setRecipe] = useState(props.recipe || {});
  const [areActionsShown, setAreActionsShown]: [any, any] = useState(false);
  const [cardHeight, setCardHeight]: [any, any] = useState(null);

  const dispatch = useAppDispatch();

  const toggleActionsVisibility = (): void => {
    setAreActionsShown(!areActionsShown);
  };

  const setInitialCardHeight = (height: number) => {
    if (!cardHeight) {
      setCardHeight(height);
    }
  };

  return (
    <RecListEntryClick
      handlePressIn={() => (props.handlePressIn ? props.handlePressIn() : {})}
    >
      <Image
        source={{
          uri: "data:image/jpeg;base64," + recipe?.photo,
        }}
        style={styles.photo}
      ></Image>
      <View>
        <View style={styles.headerCheckTime}>
          <Text style={styles.header} ellipsizeMode="tail" numberOfLines={2}>
            {recipe?.title}
          </Text>
          <View style={styles.checkTime}>
            <FontAwesomeIcon
              icon={faCheck}
              style={styles.check}
              color={Colors.neutral1}
            />
            <Text style={styles.subHeader}>
              {recipe?.cookTimeHours}h {recipe?.cookTimeMinutes}m
            </Text>
          </View>
        </View>
        <RecTagList
          list={recipe?.categories}
          style="secondary"
          marginLeft={10}
          width={280}
        />
      </View>
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
  recipe: {
    display: "flex",
    flexDirection: "row",
  },
  photo: {
    height: 100,
    width: 100,
    borderColor: Colors.neutral6,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 15,
  },
  header: {
    width: 165,
    fontSize: 23,
    color: Colors.black,
    fontFamily: "Medium",
  },
  subHeader: {
    alignSelf: "center",
    fontSize: 15,
    color: Colors.neutral1,
    fontFamily: "Regular",
  },
  headerCheckTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 270,
    maxWidth: 270,
    paddingBottom: 5,
    marginLeft: 15,
  },
  check: {
    alignSelf: "center",
    marginRight: 5,
  },
  checkTime: {
    height: 25,
    flexDirection: "row",
    backgroundColor: Colors.neutral7,
    borderRadius: 5,
    marginLeft: 5,
    padding: 5,
  },
});

export default RecipeListEntry;

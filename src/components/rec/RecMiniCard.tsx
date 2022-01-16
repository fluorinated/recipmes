import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { mockPhoto } from "@constants/mock-photo";
import GestureRecognizer from "react-native-swipe-gestures";
// import GestureRecognizer, {
//   swipeDirections,
// } from "react-native-swipe-gestures";

import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import RecTagList from "@rec/RecTagList";

const RecMiniCard = (props: any) => {
  const [areActionsShown, setAreActionsShown] = useState(false);
  const [recipe, setRecipe] = useState(
    props.recipe || {
      categories: ["breakfast"],
      ingredients: [
        { unit: "tsp", amount: 1, title: "ingredient 1" },
        { unit: "tbsp", amount: 5, title: "ingredient 2" },
      ],
      steps: ["Step 1", "Step 2"],
      title: "scrambled eggs",
      cookTimeHours: 1,
      cookTimeMinutes: 30,
      isFavorite: true,
      isFlagged: true,
      photo: mockPhoto,
    }
  );

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    DMSans_400Regular,
  });

  const onClickEllipsis = () => {
    if (areActionsShown) {
      setAreActionsShown(false);
    } else {
      setAreActionsShown(true);
    }
  };

  return (
    <GestureRecognizer
      onSwipe={(direction, state) =>
        console.log(
          "TO-DO: add actions on swipe",
          direction,
          state,
          swipeDirections
        )
      }
    >
      <TouchableOpacity
        style={styles.recipe}
        onPress={() => props.navigation.navigate("Recipe", recipe)}
      >
        <Image
          source={{
            uri: "data:image/jpeg;base64," + recipe.photo,
          }}
          style={[styles.photo]}
        ></Image>
        <View>
          <View style={styles.headerCheckTime}>
            <Text
              style={[
                styles.header,
                fontsLoaded ? { fontFamily: "DMSans_400Regular" } : {},
              ]}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {recipe.title}
            </Text>
            <View style={styles.checkTime}>
              <FontAwesomeIcon
                icon={faCheck}
                style={styles.check}
                color={Colors.neutral1}
              />
              <Text style={styles.subHeader}>
                {recipe.cookTimeHours}h {recipe.cookTimeMinutes}m
              </Text>
            </View>
          </View>

          <RecTagList
            list={recipe.categories}
            style="secondary"
            selectedTags={(tags: any[]) => `${tags}`}
            marginLeft={10}
          />
        </View>
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  recipe: {
    display: "flex",
    flexDirection: "row",
    height: 120,
    width: 420,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.neutral7,
    borderBottomWidth: 1,
    paddingVertical: 10,
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
    width: 180,
    fontSize: 23,
    color: Colors.black,
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
  subHeader: {
    alignSelf: "center",
    fontSize: 15,
    color: Colors.neutral1,
  },
  categories: {
    flexDirection: "row",
    width: 200,
    fontSize: 15,
    paddingRight: 45,
    paddingTop: 10,
    overflow: "scroll",
  },
  category: {
    borderRadius: 13,
    backgroundColor: `${Colors.white}50`,
    borderColor: Colors.neutral4,
    color: Colors.neutral1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 8,
    paddingLeft: 8,
    borderWidth: 1,
    marginRight: 5,
    marginTop: 5,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    alignSelf: "flex-end",
    position: "absolute",
    width: "100%",
    backgroundColor: Colors.neutral6,
    borderRadius: 5,
    marginTop: 100,
    padding: 10,
    zIndex: 100,
  },
  ellipsisContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-end",
    position: "absolute",
    height: 90,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    paddingLeft: 2,
    marginTop: 10,
    paddingTop: 10,
  },
});

export default RecMiniCard;

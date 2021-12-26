import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faHeart,
  faFlag,
  faTrash,
  faCheck,
  faEllipsisV,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import RecIconButton from "@rec/RecIconButton";
import { mockPhoto } from "@constants/mock-photo";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { BlurView } from "expo-blur";

import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import RecTagList from "./RecTagList";

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
    // onSwipe={(direction, state) => console.log(direction, state)}
    <GestureRecognizer>
      <TouchableOpacity
        style={styles.recipe}
        onPress={() => props.navigation.navigate("Recipe", recipe)}
      >
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
          selectedTags={(tags: any[]) => console.log(tags)}
        />
        {/* <ScrollView horizontal={true} style={styles.categories}>
          {recipe.categories?.map((category: string, i: number) => (
            <Text style={styles.category} key={i}>
              {category}
            </Text>
          ))}
        </ScrollView> */}
        {/* <View>
            <View style={styles.description}>
             
            </View> */}

        {/* <View
              style={[
                styles.ellipsisContainer,
                {
                  backgroundColor: areActionsShown
                    ? Colors.neutral6
                    : Colors.neutral7,
                },
              ]}
            >
              <RecIconButton icon={faEllipsisV} handleClick={onClickEllipsis} />
            </View> */}
        {/* </View> */}

        {/* <View style={areActionsShown ? styles.actions : styles.hidden}>
            {props.isMenu ? (
              <RecIconButton
                icon={faUtensils}
                handleClick={() => console.log("mark as eaten")}
                margin={20}
              />
            ) : (
              <RecIconButton
                icon={faPlus}
                handleClick={() =>
                  props.navigation.navigate("Menus", {
                    screen: "MenusHome",
                    params: { recipe },
                  })
                }
                margin={20}
              />
            )}

            <RecIconButton icon={faHeart} margin={20} />
            <RecIconButton icon={faFlag} margin={20} />
            <RecIconButton icon={faTrash} margin={20} />
          </View>*/}
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  recipe: {
    backgroundColor: "transparent",
    borderRadius: 10,
    fontFamily: "Kailasa",
    height: 120,
    width: 370,
    borderBottomColor: Colors.neutral4,
    borderBottomWidth: 1,
  },
  header: {
    fontSize: 23,
    color: Colors.black,
    maxWidth: 270,
  },
  headerCheckTime: {
    display: "flex",
    flexDirection: "row",
    width: 380,
    height: 80,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 20,
  },
  check: {
    marginRight: 10,
    width: 50,
  },
  checkTime: {
    paddingTop: 5,
    width: 100,
    flexDirection: "row",
  },
  subHeader: {
    fontSize: 15,
    color: Colors.neutral1,
    width: 80,
  },
  categories: {
    fontSize: 15,
    width: 200,
    paddingRight: 45,
    paddingTop: 10,
    overflow: "scroll",
    flexDirection: "row",
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
    width: "100%",
    backgroundColor: Colors.neutral6,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 100,
    padding: 10,
    position: "absolute",
    zIndex: 100,
  },
  ellipsisContainer: {
    height: 90,
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-end",
    position: "absolute",
    paddingLeft: 2,
    marginTop: 10,
    paddingTop: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
});

export default RecMiniCard;

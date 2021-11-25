import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
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
      photo:
        "file:///var/mobile/Containers/Data/Application/74B08EF2-95B6-4435-B1ED-8589AB758CB6/Library/Caches/ExponentExperienceData/%2540m2015dominguez%252Frecipmes/ImagePicker/BCB62A00-248F-4293-A781-54E0D2A92852.jpg",
    }
  );

  const onClickEllipsis = () => {
    if (areActionsShown) {
      setAreActionsShown(false);
    } else {
      setAreActionsShown(true);
    }
  };

  return (
    <TouchableOpacity
      style={styles.recipe}
      onPress={() => props.navigation.navigate("Recipe", recipe)}
    >
      <Image
        source={{ uri: "data:image/jpeg;base64," + recipe.photo }}
        style={styles.photo}
      />

      <View>
        <Text style={styles.header}>{recipe.title}</Text>
        <View>
          <View style={styles.description}>
            <View style={styles.checkTime}>
              <FontAwesomeIcon
                icon={faCheck}
                style={styles.check}
                color={Colors.neutral3}
              />
              <Text style={styles.subHeader}>
                {recipe.cookTimeHours}h {recipe.cookTimeMinutes}m
              </Text>
            </View>
            <View style={styles.categories}>
              {recipe.categories?.map((category: string, i: number) => (
                <Text style={styles.category} key={i}>
                  {category}
                </Text>
              ))}
            </View>
          </View>

          <View
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
          </View>
        </View>

        <View style={areActionsShown ? styles.actions : styles.hidden}>
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  recipe: {
    backgroundColor: Colors.neutral7,
    borderRadius: 10,
    paddingTop: 15,
    marginTop: 10,
    flexDirection: "row",
    fontFamily: "Kailasa",
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 5,
    marginRight: 15,
  },
  header: {
    fontSize: 20,
    color: Colors.neutral1,
  },
  check: {
    marginRight: 10,
    width: 50,
  },
  checkTime: {
    width: 100,
    flexDirection: "row",
  },
  description: {
    marginTop: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    width: 270,
    paddingBottom: 100,
  },
  separator: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: Colors.neutral1,
  },
  subHeader: {
    fontSize: 15,
    color: Colors.neutral2,
    width: 80,
  },
  categories: {
    fontSize: 15,
    width: "100%",
    paddingRight: 45,
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  category: {
    borderRadius: 13,
    backgroundColor: `${Colors.neutral6}70`,
    borderColor: Colors.neutral4,
    color: Colors.neutral2,
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

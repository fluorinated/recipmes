import React, { useState, useEffect } from "react";
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
} from "@fortawesome/free-solid-svg-icons";

const RecipeMiniCard = (props: any) => {
  const [areActionsShown, setAreActionsShown] = useState(false);
  const [recipe, setRecipe] = useState({
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
  });

  useEffect(() => {
    setRecipe(props.recipe);
  }, []);

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
      onPress={() => props.props.navigate("Recipe", recipe)}
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
                color={Colors.neutral2}
              />
              <Text style={styles.subHeader}>
                {recipe.cookTimeHours}h {recipe.cookTimeMinutes}m
              </Text>
            </View>
            <View style={styles.ellipsisContainer}>
              <TouchableOpacity
                style={styles.ellipsis}
                onPressIn={onClickEllipsis}
              >
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  style={styles.action}
                  color={Colors.neutral1}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.categories}>
            {recipe.categories.join(" •\u00A0")}
          </Text>
        </View>

        <View style={areActionsShown ? styles.actions : styles.hidden}>
          <View style={styles.actionContainer}>
            <FontAwesomeIcon icon={faPlus} style={styles.action} />
          </View>
          <View style={styles.actionContainer}>
            <FontAwesomeIcon icon={faHeart} style={styles.action} />
          </View>
          <View style={styles.actionContainer}>
            <FontAwesomeIcon icon={faFlag} style={styles.action} />
          </View>
          <View style={styles.actionContainer}>
            <FontAwesomeIcon icon={faTrash} style={styles.action} />
          </View>
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
    padding: 10,
    width: "95%",
    marginTop: 10,
    flexDirection: "row",
    fontFamily: "Kailasa",
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  header: {
    marginLeft: 20,
    fontSize: 20,
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
    marginLeft: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
  },
  separator: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: Colors.neutral1,
  },
  subHeader: {
    fontSize: 15,
    color: Colors.neutral1,
    width: 80,
  },
  categories: {
    fontSize: 15,
    color: Colors.neutral2,
    width: 200,
    marginLeft: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "83%",
  },
  action: {
    backgroundColor: Colors.neutral5,
  },
  actionContainer: {
    backgroundColor: Colors.neutral5,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    marginTop: 20,
  },
  ellipsis: {
    backgroundColor: Colors.neutral5,
    padding: 10,
    borderRadius: 7,
    width: 38,
    zIndex: 1,
  },
  ellipsisContainer: {
    zIndex: 1,
  },
});

export default RecipeMiniCard;

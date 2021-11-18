import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faHeart,
  faFlag,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import RecIconButton from "@rec/RecIconButton";

const RecipeScreen = (props: any) => {
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
    setRecipe(props.route.params);
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.recipe}>
        <View style={styles.actions}>
          <RecIconButton icon={faPlus} />
          <RecIconButton icon={faHeart} />
          <RecIconButton icon={faFlag} />
          <RecIconButton icon={faTrash} />
        </View>
        <Image
          source={{ uri: "data:image/jpeg;base64," + recipe.photo }}
          style={styles.photo}
        />
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.description}>
          <FontAwesomeIcon icon={faCheck} style={styles.check} />
          <Text>
            {recipe.cookTimeHours}h {recipe.cookTimeMinutes}m
          </Text>
          <Text style={styles.separator}>•</Text>
          <Text>{recipe.categories.join(" •\u00A0")}</Text>
        </View>
        <Text style={styles.subtitle}>ingredients</Text>
        {recipe.ingredients.map((ingredient, i) => (
          <Text key={i}>
            •{" "}
            {`${ingredient.amount} ${ingredient.unit} ${ingredient.title}`.replace(
              /\s+/g,
              " "
            )}
          </Text>
        ))}
        <Text style={styles.subtitle}>how to make</Text>
        {recipe.steps.map((step, i) => (
          <View style={styles.step} key={i}>
            <Text style={styles.stepTitle}>{i + 1}.</Text>
            <Text>{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    flex: 1,
    margin: 10,
    fontFamily: "Kailasa",
    alignItems: "center",
  },
  recipe: {
    width: "100%",
    flexDirection: "column",
  },
  photo: {
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    paddingTop: 15,
    paddingBottom: 15,
  },
  description: {
    flexDirection: "row",
  },
  check: {
    marginRight: 10,
  },
  separator: {
    marginLeft: 5,
    marginRight: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  stepTitle: {
    fontSize: 20,
    paddingRight: 5,
    width: 20,
  },
  step: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default RecipeScreen;

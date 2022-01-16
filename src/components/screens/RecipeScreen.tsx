import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import RecActions from "@rec/RecActions";
import RecCard from "@rec/RecCard";
import RecTagList from "@rec/RecTagList";
import RecCheckbox from "@rec/RecCheckbox";

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
      <RecActions />
      <RecCard
        paddingLeft={0}
        paddingRight={0}
        paddingTop={0}
        paddingBottom={150}
      >
        <Image
          source={{ uri: `data:image/jpeg;base64,${recipe.photo}` }}
          style={styles.photo}
        />
        <View style={styles.mainContent}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={3}>
            {recipe.title}
          </Text>
          <View style={styles.description}>
            <FontAwesomeIcon icon={faCheck} style={styles.check} />
            <Text>
              {recipe.cookTimeHours}h {recipe.cookTimeMinutes}m
            </Text>
            <Text style={styles.separator}>•</Text>
            <Text>500 calories</Text>
          </View>
          <RecTagList
            list={recipe.categories}
            style="secondary"
            selectedTags={(tags: any[]) => `${tags}`}
            marginTop={10}
          />
          <Text style={styles.subtitle}>ingredients</Text>
          {recipe.ingredients.map((ingredient, i) => (
            <RecCheckbox
              label={`${ingredient.amount} ${ingredient.unit} ${ingredient.title}`.replace(
                /\s+/g,
                " "
              )}
              isChecked={(isChecked: boolean) => true}
              key={i}
            />
          ))}
          <Text style={styles.subtitle}>how to make</Text>
          {recipe.steps.map((step, i) => (
            <View style={styles.step} key={i}>
              <Text style={styles.stepTitle}>{i + 1}.</Text>
              <Text style={styles.stepContent}>{step}</Text>
            </View>
          ))}
        </View>
      </RecCard>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    backgroundColor: Colors.neutral7,
    paddingTop: 10,
  },
  photo: {
    height: 300,
    width: "100%",
    borderRadius: 10,
  },
  mainContent: {
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    fontFamily: "DMSans_400Regular",
    paddingVertical: 15,
  },
  subtitle: {
    fontSize: 25,
    fontFamily: "DMSans_400Regular",
    paddingTop: 25,
    paddingBottom: 5,
  },
  description: {
    flexDirection: "row",
  },
  check: {
    marginRight: 10,
  },
  separator: {
    marginHorizontal: 5,
  },
  stepTitle: {
    width: 20,
    fontSize: 20,
    color: Colors.black,
    paddingRight: 5,
  },
  stepContent: {
    color: Colors.neutral1,
    marginTop: 3,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 10,
  },
});

export default RecipeScreen;

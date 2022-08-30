import { Colors } from '@constants/colors';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { Ingredient } from '@models/Ingredient';
import RecCard from '@rec/RecCard';
import RecCheckbox from '@rec/RecCheckbox';
import RecRecipeActions from '@rec/RecRecipeActions';
import RecTagList from '@rec/RecTagList';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { selectCurrentRecipe } from 'store/recipes/recipes.selectors';

const RecipeScreen = (props: any) => {
  const [recipe, setRecipe]: [any, any] = useState(
    props?.route?.params?.recipe || {}
  );
  const searchedText: string = useAppSelector(selectCurrentRecipe);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.background}>
      <RecRecipeActions recipe={recipe} marginBottom={15} dark {...props} />
      <RecCard paddingLeft={0} paddingRight={0} paddingTop={0} height={580}>
        <Image
          source={{ uri: "data:image/jpeg;base64," + recipe.photo }}
          style={styles.photo}
        />
        <View style={styles.mainContent}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={3}>
            {recipe?.title}
          </Text>
          <View style={styles.description}>
            <FontAwesomeIcon
              icon={faCheck}
              style={styles.check}
              color={Colors.neutral2}
            />
            <Text style={styles.text}>
              {recipe?.cookTimeHours}h {recipe?.cookTimeMinutes}m
            </Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.text}>500 calories</Text>
          </View>
          <RecTagList
            list={recipe.categories}
            style="secondary"
            selectedTags={(tags: any[]) => `${tags}`}
            marginTop={10}
          />
          <Text style={styles.subtitle}>ingredients</Text>
          {recipe?.ingredients?.map((ingredient: Ingredient, i: number) => (
            <RecCheckbox
              label={`${ingredient?.amount ?? ""} ${ingredient?.unit ?? ""} ${
                ingredient?.title ?? ""
              }`.replace(/\s+/g, " ")}
              isChecked={(isChecked: boolean) => true}
              key={i}
            />
          ))}
          <Text style={styles.subtitle}>how to make</Text>
          {recipe?.steps?.map((step: string, i: number) => (
            <View
              style={[
                styles.step,
                { backgroundColor: i % 2 == 0 ? Colors.pink6 : Colors.pink7 },
              ]}
              key={i}
            >
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
    paddingVertical: 15,
    color: Colors.black,
    fontFamily: "Medium",
  },
  subtitle: {
    fontSize: 25,
    paddingTop: 25,
    paddingBottom: 15,
    color: Colors.black,
    fontFamily: "Regular",
  },
  text: {
    color: Colors.neutral1,
    fontFamily: "Regular",
  },
  description: {
    flexDirection: "row",
  },
  check: {
    marginRight: 10,
  },
  separator: {
    marginHorizontal: 5,
    fontFamily: "Regular",
  },
  stepTitle: {
    width: 22,
    color: Colors.black,
    fontFamily: "Medium",
    fontSize: 22,
    marginLeft: 5,
  },
  stepContent: {
    color: Colors.yellow1,
    marginTop: 3,
    marginRight: 30,
    fontFamily: "Regular",
    fontSize: 18,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
    padding: 4,
    marginBottom: 5,
  },
});

export default RecipeScreen;

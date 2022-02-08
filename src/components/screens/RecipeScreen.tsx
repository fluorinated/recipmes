import { Colors } from '@constants/colors';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import RecCard from '@rec/RecCard';
import RecCheckbox from '@rec/RecCheckbox';
import RecRecipeActions from '@rec/RecRecipeActions';
import RecTagList from '@rec/RecTagList';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const RecipeScreen = (props: any) => {
  const [recipe, setRecipe]: [any, any] = useState(
    props?.route?.params?.recipe || {}
  );

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
          {recipe?.ingredients?.map((ingredient, i) => (
            <RecCheckbox
              label={`${ingredient?.amount ?? ""} ${ingredient?.unit ?? ""} ${
                ingredient?.title ?? ""
              }`.replace(/\s+/g, " ")}
              isChecked={(isChecked: boolean) => true}
              key={i}
            />
          ))}
          <Text style={styles.subtitle}>how to make</Text>
          {recipe?.steps?.map((step, i) => (
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
    color: Colors.black,
  },
  subtitle: {
    fontSize: 25,
    fontFamily: "DMSans_400Regular",
    paddingTop: 25,
    paddingBottom: 5,
    color: Colors.black,
  },
  text: {
    color: Colors.neutral1,
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
    marginRight: 10,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 10,
  },
});

export default RecipeScreen;

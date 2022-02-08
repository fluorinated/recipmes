import { Colors } from '@constants/colors';
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import RecListEntry from '@rec/RecListEntry';
import RecTagList from '@rec/RecTagList';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const RecipeListEntry = (props: any) => {
  const [recipe, setRecipe] = useState(props.recipe || {});

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    DMSans_400Regular,
  });

  return (
    <RecListEntry
      handleClick={() =>
        props.navigation.navigate("Recipes", {
          screen: "Recipe",
          params: { recipe },
        })
      }
      iconSet="recipe"
      recipe={recipe}
    >
      <View style={styles.recipe}>
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
            width={280}
          />
        </View>
      </View>
    </RecListEntry>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
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
    width: 180,
    fontSize: 23,
    color: Colors.black,
  },
  subHeader: {
    alignSelf: "center",
    fontSize: 15,
    color: Colors.neutral1,
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

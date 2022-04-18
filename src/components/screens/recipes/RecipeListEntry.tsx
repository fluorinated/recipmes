import { Colors } from '@constants/colors';
import { faCheck, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import RecTagList from '@rec/RecTagList';
import RecIconButton from 'components/rec/RecIconButton';
import RecRecipeActions from 'components/rec/RecRecipeActions';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RecipeListEntry = (props: any) => {
  const [recipe, setRecipe] = useState(props.recipe || {});
  const [areActionsShown, setAreActionsShown]: [any, any] = useState(false);
  const [cardHeight, setCardHeight]: [any, any] = useState(null);

  // let [fontsLoaded] = useFonts({
  //   Inter_400Regular,
  //   DMSans_400Regular,
  // });

  const toggleActionsVisibility = (): void => {
    setAreActionsShown(!areActionsShown);
  };

  const setInitialCardHeight = (height: number) => {
    if (!cardHeight) {
      setCardHeight(height);
    }
  };

  return (
    <TouchableOpacity
      onPressIn={() =>
        props.navigation.navigate("Recipes", {
          screen: "Recipe",
          params: { recipe },
        })
      }
      style={styles.card}
    >
      <TouchableOpacity
        style={
          areActionsShown
            ? [styles.actions, { height: cardHeight }]
            : styles.hidden
        }
      >
        <RecRecipeActions {...props} />
      </TouchableOpacity>

      <View
        style={!areActionsShown ? styles.recipe : styles.hidden}
        onLayout={(e) => setInitialCardHeight(e.nativeEvent.layout.height)}
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
                // fontsLoaded ? { fontFamily: "DMSans_400Regular" } : {},
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
      <RecIconButton
        icon={faEllipsisH}
        color={Colors.neutral4}
        size={16}
        handleClick={() => toggleActionsVisibility()}
        marginLeft={15}
        marginTop={10}
      />
    </TouchableOpacity>
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

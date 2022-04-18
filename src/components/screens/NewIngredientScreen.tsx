import { Colors } from '@constants/colors';
import RecButton from '@rec/RecButton';
import RecLoader from '@rec/RecLoader';
import RecMultiInput from '@rec/RecMultiInput';
import Parse from 'parse/react-native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const NewIngredientScreen = (props: any) => {
  const [ingredient, setIngredient]: [any, any] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);

  const saveIngredient = async () => {
    setIsLoading(true);

    let Ingredient = new Parse.Object("ingredient");
    Ingredient.save(ingredient).then(
      (results) => {
        setIsLoading(false);
        props.navigation.navigate("Ingredients", {
          screen: "IngredientsHome",
          params: { isShowing: true, errorMessage: null },
        });
      },
      (error) => {
        setIsLoading(false);
        const { message, code } = JSON.parse(JSON.stringify(error));
        props.navigation.navigate("Ingredients", {
          screen: "IngredientsHome",
          params: {
            isShowing: true,
            errorMessage: `${code} ${message}`,
          },
        });
        console.log("[NewIngredientScreen] saveIngredient error:", error);
      }
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAwareScrollView>
        <View style={styles.inputsContainer}>
          <RecMultiInput
            placeholder="ingredient"
            title="ingredient"
            isIngredients
            ingredients={(ingredients: any[]) => setIngredient(ingredients[0])}
            hidePlus
          />
        </View>
        {isLoading ? (
          <RecLoader />
        ) : (
          <RecButton handleClick={saveIngredient} label="save ingredient" />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.neutral7,
    margin: 10,
    marginBottom: 100,
  },
  inputsContainer: {
    marginBottom: 30,
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  cookTime: {
    color: Colors.neutral1,
    marginTop: 20,
    marginLeft: 5,
  },
  container: {
    paddingBottom: 20,
  },
});

export default NewIngredientScreen;

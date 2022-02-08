import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import RecButton from '@rec/RecButton';
import RecCard from '@rec/RecCard';
import RecEmptyState from '@rec/RecEmptyState';
import RecListEntry from '@rec/RecListEntry';
import { getDateNumeric } from '@utils/format-date';
import RecLoader from 'components/rec/RecLoader';
import { Colors } from 'constants/colors';
import Parse from 'parse/react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const IngredientsScreen = (props: any) => {
  const [ingredients, setIngredients]: [any, any] = useState(undefined);

  useEffect(() => {
    getIngredients();
  });

  const getIngredients = async (): Promise<void> => {
    const query = new Parse.Query("ingredient");

    query.find().then(
      (results) => {
        setIngredients(JSON.parse(JSON.stringify(results)));
      },
      (error) => {
        console.log("[IngredientsScreen] getIngredients error:", error);
      }
    );
  };

  const handleClickedIcon = (icon: string) => {
    switch (icon) {
      case "flag":
        console.log("toggle isRunningLow for ingredient in db (update)");
        break;
      case "pen":
        console.log("send to addNew ingredient page to (update/upsert)");
        break;
      case "trash":
        console.log("delete ingredient in db (delete)");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.background}>
      <RecButton
        handleClick={() => props.navigation.navigate("NewIngredient")}
        label="add ingredient"
      />
      <RecCard search paddingLeft={0} paddingRight={0}>
        {ingredients && ingredients?.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <RecEmptyState
              icon={faBinoculars}
              header="no ingredients found"
              subheader="add a new ingredient or adjust your search"
              handleClick={() => props.navigation.navigate("NewIngredient")}
              buttonLabel="add ingredient"
            />
          </View>
        )}

        {!ingredients && <RecLoader />}

        {ingredients &&
          ingredients?.length > 0 &&
          ingredients.map((ingredient: any, index: number) => (
            <RecListEntry
              key={index}
              header={{
                left: ingredient.title,
                right: `${ingredient.amount || ""} ${ingredient.unit || ""}`,
              }}
              subheader={{
                left: getDateNumeric(ingredient.createdAt),
                right: ingredient.expirationDate,
              }}
              iconSet="ingredient"
              handleActionClick={(icon: string) => handleClickedIcon(icon)}
            />
          ))}
      </RecCard>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.neutral7,
  },
  emptyStateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IngredientsScreen;

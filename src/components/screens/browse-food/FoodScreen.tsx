import { Colors } from '@constants/colors';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@hooks/redux-hooks';
import RecCard from '@rec/RecCard';
import RecEmptyState from '@rec/RecEmptyState';
import RecLoader from '@rec/RecLoader';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FoodScreen = (props: any) => {
  const [food, setFood]: [any, any] = useState(props?.route?.params?.food);
  const dispatch = useAppDispatch();

  const handlePressIn = (): void => {
    // add to groceries and navigate to groceries
    // dispatch(setCurrentRecipe(recipe));
    // props.navigation.navigate("Recipes", {
    //   screen: "Recipe",
    //   params: { recipe },
    // });
  };

  return (
    <View style={styles.background}>
      <RecCard paddingLeft={0} height={450}>
        {!food && (
          <View style={styles.emptyStateContainer}>
            <RecEmptyState
              icon={faBinoculars}
              header="no food found"
              subheader="try adjusting your search"
            />
          </View>
        )}

        {!food && <RecLoader />}

        <Text style={styles.header}>{food?.description.toLowerCase()}</Text>
        <Text style={styles.subHeader}>{food?.foodCategory.toLowerCase()}</Text>

        <View style={styles.container}>
          {food?.foodNutrients?.map((nutrient, i) => (
            <View
              style={[
                styles.subHeader,
                { backgroundColor: i % 2 == 0 ? Colors.pink6 : Colors.pink7 },
              ]}
            >
              <Text>
                {nutrient?.nutrientNumber} {nutrient?.unitName?.toLowerCase()} •{" "}
              </Text>
              <Text style={styles.bold}>
                {nutrient?.nutrientName?.toLowerCase()}
              </Text>
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
    backgroundColor: Colors.neutral7,
  },
  bold: {
    fontWeight: "700",
  },
  header: {
    width: 300,
    fontSize: 23,
    color: Colors.black,
    fontFamily: "Medium",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  subHeader: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    fontSize: 15,
    color: Colors.neutral1,
    fontFamily: "Regular",
    borderRadius: 5,
    margin: 3,
    padding: 5,
  },
  emptyStateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
});

export default FoodScreen;

import RecTagList from '@components/rec/RecTagList';
import { groceryStores } from '@constants/grocery-stores';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@hooks/redux-hooks';
import { FoodCategory } from '@models/FoodCategory';
import RecButton from '@rec/RecButton';
import RecCard from 'components/rec/RecCard';
import RecEmptyState from 'components/rec/RecEmptyState';
import RecLoader from 'components/rec/RecLoader';
import Parse from 'parse/react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import rittenhouseJson from '../../constants/rittenhouse.json';

const GroceriesScreen = (props: any) => {
  const [groceries, setGroceries]: [any, any] = useState({});
  const [groceryStoreData, setGroceryStoreData]: [any, any] =
    useState(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getGroceries();
  }, [groceryStoreData]);

  const getGroceries = async (): Promise<void> => {
    const query = new Parse.Query("grocery");

    query.find().then(
      (results) => {
        setGroceries(JSON.parse(JSON.stringify(results)));
        console.log("success");
      },
      (error) => {
        console.log("[GroceriesScreen] getGroceries error:", error);
      }
    );
  };

  const deleteGrocery = async (grocery: any) => {
    var Grocery = Parse.Object.extend("grocery");
    var query = new Parse.Query(Grocery);
    query.equalTo("objectId", grocery.objectId);
    const currentGrocery = await query.first();

    if (currentGrocery) {
      currentGrocery.destroy().then(
        (results: any) => {
          props.navigation.navigate("Groceries", {
            screen: "GroceriesHome",
            params: {},
          });
        },
        (error: any) => {
          console.log("[GroceriesScreen] deleteGrocery error:", error);
          const { message, code } = JSON.parse(JSON.stringify(error));
          // setToast({
          //   isShowing: true,
          //   errorMessage: `${code} ${message}`,
          // });
        }
      );
    }
  };

  const handleClickedIcon = (icon: string, grocery: any) => {
    switch (icon) {
      case "pen":
        console.log("send to addNew grocery page to (update/upsert)");
        break;
      case "trash":
        deleteGrocery(grocery);
        break;
      default:
        break;
    }
  };

  const setGroceryStore = async (tags: string[]): Promise<void> => {
    let Rittenhouse = new Parse.Object("rittenhouse");

    for (let i = 0; i < rittenhouseJson.length; i++) {
      const menu = {
        title: rittenhouseJson[i].title,
        aisle: rittenhouseJson[i].aisle,
        items: rittenhouseJson[i].items,
      };
      await Rittenhouse.save(menu).then(
        (results) => {
          console.log("results", results);
        },
        (error) => {
          console.log("[MenusScreen] saveNewMenu error:", error);
          const { message, code } = JSON.parse(JSON.stringify(error));
        }
      );
    }

    //   const selectedTag = tags[0]; // only can view one store at a time
    //   console.log("query", selectedTag);
    //   const query = new Parse.Query("rittenhouse");
    //   await query
    //     .find()
    //     .then((results) => {
    //       console.log("done ===>", results);
    //       setGroceryStoreData(JSON.parse(JSON.stringify(results)));
    //     })
    //     .catch((error) => {
    //       console.log("[GroceriesScreen] setGroceryStore error:", error);
    //       const { message, code } = JSON.parse(JSON.stringify(error));
    //     });
  };

  const getStoreSections = () => {
    console.log("groceryStoreData", groceryStoreData);
    if (groceryStoreData) {
      return groceryStoreData?.map((section) => <Text>{section?.title}</Text>);
    }
  };

  return (
    <View style={styles.background}>
      <RecCard search paddingLeft={0} paddingRight={0} marginTop={10}>
        {groceries && groceries?.length === 0 && (
          <View style={styles.emptyStateContainer}>
            <RecEmptyState
              icon={faBinoculars}
              header="no groceries found"
              subheader="add a new grocery or adjust your search"
              handleClick={() => props.navigation.navigate("NewGrocery")}
              buttonLabel="add grocery"
            />
          </View>
        )}

        {!groceries && <RecLoader />}

        <RecTagList
          list={groceryStores}
          selectedTags={(tags: FoodCategory[]) => setGroceryStore(tags)}
        />

        {getStoreSections()}
        {/* map everything in supermarket AND show if in groceries list */}
      </RecCard>
      <RecButton
        handleClick={() => props.navigation.navigate("NewGrocery")}
        label="add grocery"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.neutral7,
    justifyContent: "space-between",
  },
  emptyStateContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GroceriesScreen;

import { Colors } from '@constants/colors';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import RecButton from '@rec/RecButton';
import RecCard from '@rec/RecCard';
import RecEmptyState from '@rec/RecEmptyState';
import RecListEntry from '@rec/RecListEntry';
import { getDateNumeric } from '@utils/format-date';
import RecLoader from 'components/rec/RecLoader';
import Parse from 'parse/react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const GroceriesScreen = (props: any) => {
  const [groceries, setGroceries]: [any, any] = useState(undefined);

  useEffect(() => {
    getGroceries();
  });

  const getGroceries = async (): Promise<void> => {
    const query = new Parse.Query("grocery");

    query.find().then(
      (results) => {
        setGroceries(JSON.parse(JSON.stringify(results)));
      },
      (error) => {
        console.log("[GroceriesScreen] getGroceries error:", error);
      }
    );
  };

  const handleClickedIcon = (icon: string) => {
    switch (icon) {
      case "pen":
        console.log("send to addNew grocery page to (update/upsert)");
        break;
      case "trash":
        console.log("delete grocery in db (delete)");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.background}>
      <RecButton
        handleClick={() => props.navigation.navigate("NewGrocery")}
        label="add grocery"
      />
      <RecCard search paddingLeft={0} paddingRight={0}>
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
        {groceries &&
          groceries?.length > 0 &&
          groceries.map((grocery: any, index: number) => (
            <RecListEntry
              key={index}
              header={{
                left: grocery.title,
                right: `${grocery.amount || ""} ${grocery.unit || ""}`,
              }}
              subheader={{
                left: getDateNumeric(grocery.createdAt) || "",
              }}
              iconSet="grocery"
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

export default GroceriesScreen;

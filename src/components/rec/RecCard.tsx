import { Colors } from '@constants/colors';
import { FoodCategory } from '@models/FoodCategory';
import RecSearch from '@rec/RecSearch';
import RecTagList from '@rec/RecTagList';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const RecCard = (props: any) => {
  return (
    <View
      style={[
        styles.card,
        {
          paddingTop: props.paddingTop,
          paddingLeft: props.paddingLeft,
          paddingRight: props.paddingRight,
          paddingBottom: props.paddingBottom,
        },
      ]}
    >
      <View
        style={
          props.search || props.tags
            ? styles.searchTagsContainer
            : styles.hidden
        }
      >
        <View style={!props.search && styles.hidden}>
          <RecSearch label="search" marginLeft={20} />
        </View>

        <View style={!props.tags && styles.hidden}>
          <RecTagList
            listType="food"
            selectedTags={(tags: FoodCategory[]) => `${tags}`}
            marginLeft={15}
          />
        </View>
      </View>
      <ScrollView
        style={(props.search || props.tags) && styles.childrenStickyHeader}
      >
        {props.children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  card: {
    overflow: "scroll",
    padding: 15,
    width: 430,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.neutral4,
  },
  searchTagsContainer: {
    width: "100%",
    backgroundColor: Colors.white,
    shadowColor: Colors.neutral4,
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  childrenStickyHeader: {
    marginTop: 1,
  },
});

export default RecCard;

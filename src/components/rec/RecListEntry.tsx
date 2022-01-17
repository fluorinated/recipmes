import { Colors } from '@constants/colors';
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import RecActions from '@rec/RecActions';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GestureRecognizer from 'react-native-swipe-gestures';

const RecListEntry = (props: any) => {
  const [areActionsShown, setAreActionsShown] = useState(false);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    DMSans_400Regular,
  });

  const toggleActionsVisibility = (direction: string): void => {
    ["SWIPE_LEFT", "SWIPE_RIGHT"].includes(direction) &&
      setAreActionsShown(!areActionsShown);
  };

  return (
    <GestureRecognizer
      onSwipe={(direction, state) => toggleActionsVisibility(direction)}
      style={styles.listEntry}
    >
      <TouchableOpacity onPressIn={props.handlePress}>
        <View style={!areActionsShown ? {} : styles.hidden}>
          {props.children}
          <View
            style={
              props.header && props.subheaderLeft
                ? styles.textContainer
                : styles.hidden
            }
          >
            <Text style={props.header ? styles.header : styles.hidden}>
              {props.header}
            </Text>
            <Text
              style={props.subheaderLeft ? styles.subheaderLeft : styles.hidden}
            >
              {props.subheaderLeft}
            </Text>
          </View>
        </View>
        <View style={areActionsShown ? {} : styles.hidden}>
          <RecActions />
        </View>
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  listEntry: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 420,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.neutral7,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  header: {
    color: Colors.black,
    fontSize: 23,
    paddingBottom: 5,
  },
  subheaderLeft: {
    color: Colors.neutral3,
  },
  textContainer: {
    flexDirection: "column",
    paddingLeft: 15,
  },
});

export default RecListEntry;

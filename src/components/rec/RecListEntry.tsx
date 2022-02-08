import { Colors } from '@constants/colors';
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { faCalendarAlt, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import RecActions from '@rec/RecActions';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import RecRecipeActions from './RecRecipeActions';

const RecListEntry = (props: any) => {
  const [areActionsShown, setAreActionsShown]: [any, any] = useState(false);
  const [cardHeight, setCardHeight]: [any, any] = useState(null);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    DMSans_400Regular,
  });

  const toggleActionsVisibility = (direction: string): void => {
    if (direction === "SWIPE_LEFT") {
      setAreActionsShown(false);
    }

    if (!areActionsShown && !!props.handleClick && direction === "SWIPE_LEFT") {
      props.handleClick();
    }

    if (direction === "SWIPE_RIGHT") {
      setAreActionsShown(true);
    }
  };

  const setInitialCardHeight = (height: number) => {
    if (!cardHeight) {
      setCardHeight(height);
    }
  };

  return (
    <GestureRecognizer
      onSwipe={(direction, state) => toggleActionsVisibility(direction)}
      style={styles.listEntry}
    >
      <View
        style={
          !areActionsShown
            ? { width: "100%", height: cardHeight }
            : styles.hidden
        }
        onLayout={(e) => setInitialCardHeight(e.nativeEvent.layout.height)}
      >
        {props.children}
        <View
          style={
            props.header?.left && props.subheader?.left
              ? styles.textContainer
              : styles.hidden
          }
        >
          <View style={styles.headerContainer}>
            <Text
              style={
                props.header?.left && props.header?.left?.trim() !== ""
                  ? styles.header
                  : styles.hidden
              }
            >
              {props.header?.left?.trim()}
            </Text>
            <View
              style={
                props.header?.right && props.header?.right?.trim() !== ""
                  ? styles.headerRight
                  : styles.hidden
              }
            >
              <Text style={styles.headerRightText}>
                {props.header?.right?.trim()}
              </Text>
            </View>
          </View>
          <View style={props.subheader ? styles.subheader : styles.hidden}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              color={Colors.neutral3}
              size={15}
              style={
                !props.subheader?.left && props.subheader?.left?.trim() !== ""
                  ? styles.hidden
                  : styles.icon
              }
            />
            <Text
              style={
                props.subheader?.left && props.subheader?.left?.trim() !== ""
                  ? styles.subheaderText
                  : styles.hidden
              }
            >
              {props.subheader?.left?.trim()}
            </Text>
            <FontAwesomeIcon
              icon={faCalendarTimes}
              color={Colors.neutral3}
              size={15}
              style={
                !props.subheader?.right && props.subheader?.right?.trim() !== ""
                  ? styles.hidden
                  : styles.icon
              }
            />
            <Text
              style={
                props.subheader?.right && props.subheader?.right?.trim() !== ""
                  ? styles.subheaderText
                  : styles.hidden
              }
            >
              {props.subheader?.right?.trim()}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={
          areActionsShown
            ? { ...styles.actionsContainer, height: cardHeight }
            : styles.hidden
        }
      >
        {props.iconSet === "recipe" ? (
          <RecRecipeActions {...props} />
        ) : (
          <RecActions
            iconSet={props.iconSet}
            handleClick={(icon: string) => props.handleActionClick(icon)}
          />
        )}
      </View>
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
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderBottomColor: Colors.neutral7,
    borderBottomWidth: 1,
    width: 420,
    paddingVertical: 15,
  },
  header: {
    color: Colors.black,
    fontSize: 23,
    paddingBottom: 5,
    width: "100%",
  },
  subheader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  subheaderText: {
    color: Colors.neutral4,
    marginRight: 5,
  },
  textContainer: {
    flexDirection: "column",
    paddingLeft: 15,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 330,
    maxWidth: 330,
    paddingBottom: 5,
  },
  headerRight: {
    height: 25,
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    alignContent: "flex-end",
    justifyContent: "flex-end",
    backgroundColor: Colors.neutral7,
    borderRadius: 5,
    padding: 5,
  },
  headerRightText: {
    alignSelf: "center",
    fontSize: 15,
    color: Colors.neutral1,
  },
  icon: {
    marginRight: 5,
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RecListEntry;

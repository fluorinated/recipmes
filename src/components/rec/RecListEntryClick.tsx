import { Colors } from '@constants/colors';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import RecIconButton from 'components/rec/RecIconButton';
import RecRecipeActions from 'components/rec/RecRecipeActions';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const RecListEntryClick = (props: any) => {
  const [areActionsShown, setAreActionsShown]: [any, any] = useState(false);
  const [cardHeight, setCardHeight]: [any, any] = useState(null);

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
      onPressIn={() => props.handlePressIn()}
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
        {props.children}
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
    fontFamily: "Medium",
  },
  subHeader: {
    alignSelf: "center",
    fontSize: 15,
    color: Colors.neutral1,
    fontFamily: "Regular",
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

export default RecListEntryClick;

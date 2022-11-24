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

      <View style={props.inlineBtn ? styles.row : styles.column}>
        <View
          style={!areActionsShown ? styles.row : {}}
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
      </View>
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
    width: "100%",
    paddingVertical: 15,
  },
  actions: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  column: {
    alignItems: "flex-start",
  },
});

export default RecListEntryClick;

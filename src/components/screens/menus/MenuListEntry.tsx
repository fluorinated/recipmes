import { Colors } from '@constants/colors';
import { useAppDispatch } from '@hooks/redux-hooks';
import RecListEntryClick from 'components/rec/RecListEntryClick';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';

const MenuListEntry = (props: any) => {
  // const recipe: Recipe = useAppSelector(selectCurrentRecipe);
  // const recipes: Recipe = useAppSelector(selectCurrentRecipe);
  const [menu, setMenu] = useState(props?.menu || {});
  const [areActionsShown, setAreActionsShown]: [any, any] = useState(false);
  const [cardHeight, setCardHeight]: [any, any] = useState(null);

  const dispatch = useAppDispatch();

  const toggleActionsVisibility = (): void => {
    setAreActionsShown(!areActionsShown);
  };

  const setInitialCardHeight = (height: number) => {
    if (!cardHeight) {
      setCardHeight(height);
    }
  };

  return (
    <RecListEntryClick
      inlineBtn={true}
      handlePressIn={() => (props.handlePressIn ? props.handlePressIn() : {})}
    >
      <Text style={styles.header} ellipsizeMode="tail" numberOfLines={2}>
        {menu?.title}
      </Text>
    </RecListEntryClick>
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
  header: {
    width: 180,
    fontSize: 23,
    color: Colors.black,
    fontFamily: "Medium",
    paddingLeft: 15,
  },
  subHeader: {
    alignSelf: "center",
    fontSize: 15,
    color: Colors.neutral1,
    fontFamily: "Regular",
  },
});

export default MenuListEntry;

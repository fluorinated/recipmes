import { faFlag, faHeart, faPen, faPlus, faTrash, faUndo, faUtensils } from '@fortawesome/free-solid-svg-icons';
import RecIconButton from '@rec/RecIconButton';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const RecActions = (props: any) => {
  const recipeBase = [faHeart, faFlag, faPen, faTrash];
  const icons = {
    recipe: [faPlus, ...recipeBase],
    recipeMenu: [faUtensils, ...recipeBase],
    recipeEaten: [faUndo, ...recipeBase],
    ingredient: [faFlag, faPen, faTrash],
    grocery: [faPen, faTrash],
    menus: [faTrash],
    menu: [faPen, faTrash],
  };
  const getIconSet = () => {
    switch (props.iconSet) {
      case "recipe":
        return "recipe";
      case "recipeMenu":
        return "recipeMenu";
      case "recipeEaten":
        return "recipeEaten";
      case "ingredient":
        return "ingredient";
      case "grocery":
        return "grocery";
      case "menus":
        return "menus";
      case "menu":
        return "menu";
      default:
        return "recipe";
    }
  };

  const [currentIcons, setCurrentIcons] = useState(icons[getIconSet()] || []);

  return (
    <View
      style={[
        styles.actions,
        {
          marginTop: props.marginTop,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginBottom: props.marginBottom,
        },
      ]}
    >
      {currentIcons.map((icon, i) => (
        <RecIconButton
          marginRight={15}
          icon={icon}
          handleClick={() => props.handleClick(icon.iconName)}
          dark={props.dark}
          key={i}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 420,
  },
});

export default RecActions;

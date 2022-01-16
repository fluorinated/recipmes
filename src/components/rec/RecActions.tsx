import React from "react";
import { StyleSheet, View } from "react-native";
import RecIconButton from "@rec/RecIconButton";
import {
  faPlus,
  faHeart,
  faFlag,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const RecActions = (props: any) => {
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
      <RecIconButton
        margin={15}
        icon={faPlus}
        handleClick={props.handleClick}
        dark={props.dark}
      />
      <RecIconButton margin={15} icon={faHeart} dark={props.dark} />
      <RecIconButton margin={15} icon={faFlag} dark={props.dark} />
      <RecIconButton margin={15} icon={faPen} dark={props.dark} />
      <RecIconButton margin={15} icon={faTrash} dark={props.dark} />
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

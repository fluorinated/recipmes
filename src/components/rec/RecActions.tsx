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
    <View style={styles.actions}>
      <RecIconButton
        margin={15}
        icon={faPlus}
        handleClick={props.handleClick}
      />
      <RecIconButton margin={15} icon={faHeart} />
      <RecIconButton margin={15} icon={faFlag} />
      <RecIconButton margin={15} icon={faPen} />
      <RecIconButton margin={15} icon={faTrash} />
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
    marginBottom: 15,
  },
});

export default RecActions;

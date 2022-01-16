import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  faCheck,
  faPen,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import RecIconButton from "@rec/RecIconButton";
import RecInput from "@rec/RecInput";
import { Colors } from "@constants/colors";

const RecInputLabel = (props: any) => {
  const [isInputShown, setIsInputShown] = useState(false);
  const [label, setLabel] = useState(props.placeholder);
  const [editedLabel, setEditedLabel] = useState(props.placeholder);

  const handleOkClick = () => {
    setIsInputShown(false);
    setLabel(editedLabel);
  };
  const handleDiscardClick = () => {
    setIsInputShown(false);
    setEditedLabel(label);
  };
  const handleEditClick = () => {
    setIsInputShown(true);
  };
  const handleDeleteClick = () => {
    props.handleDeleteClick && props.handleDeleteClick();
  };

  return (
    <View>
      <View style={isInputShown ? styles.inputActions : styles.hidden}>
        <RecInput
          placeholder={props.placeholder}
          title={props.inputTitle}
          handleChangeText={(text: any) => setEditedLabel(text)}
          size="third"
          value={editedLabel}
        />
        <View style={styles.actions}>
          <RecIconButton icon={faCheck} size={30} handleClick={handleOkClick} />
          <RecIconButton
            icon={faTimes}
            size={30}
            handleClick={handleDiscardClick}
          />
        </View>
      </View>

      <View style={isInputShown ? styles.hidden : styles.titleActions}>
        <Text style={styles.title}>{label}</Text>
        <View style={styles.actions}>
          <RecIconButton icon={faPen} handleClick={handleEditClick} />
          <RecIconButton icon={faTrash} handleClick={handleDeleteClick} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  title: {
    fontSize: 25,
    color: Colors.black,
    paddingTop: 15,
    paddingBottom: 15,
  },
  titleActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  actions: {
    flexDirection: "row",
  },
  inputActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    marginTop: 10,
  },
});

export default RecInputLabel;

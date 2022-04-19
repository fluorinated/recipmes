import { Colors } from '@constants/colors';
import { faCheck, faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import RecIconButton from '@rec/RecIconButton';
import RecInput from '@rec/RecInput';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  const handleEditOkClick = () => {
    isInputShown ? handleOkClick() : handleEditClick();
  };
  const handleDiscardDeleteClick = () => {
    isInputShown ? handleDiscardClick() : handleDeleteClick();
  };

  return (
    <View style={styles.container}>
      {isInputShown ? (
        <RecInput
          placeholder={props.placeholder}
          title={props.inputTitle}
          handleChangeText={(text: any) => setEditedLabel(text)}
          size="third"
          value={editedLabel}
        />
      ) : (
        <Text style={styles.title}>{label}</Text>
      )}

      <View style={styles.actions}>
        <RecIconButton
          icon={isInputShown ? faCheck : faPen}
          handleClick={handleEditOkClick}
          dark
          marginRight={5}
        />
        <RecIconButton
          icon={isInputShown ? faTimes : faTrash}
          handleClick={handleDiscardDeleteClick}
          dark
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: Colors.black,
    alignSelf: "center",
    fontFamily: "Medium",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: 390,
    marginHorizontal: 10,
    height: 60,
  },
  actions: {
    flexDirection: "row",
    marginBottom: 5,
  },
});

export default RecInputLabel;

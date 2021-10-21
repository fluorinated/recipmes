import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../colors";
import RecInput from "../RecInput";
import RecSelect from "../RecSelect";
import RecCheckbox from "../RecCheckbox";
// import RecPhotoUpload from '../RecPhotoUpload';

const NewRecipeScreen = (props) => {
  return (
    <View style={styles.background}>
      <View style={styles.inputsContainer}>
        <RecInput placeholder="recipe" title="recipe" width="90%" />
        <View style={styles.row}>
          <RecInput
            placeholder="amount"
            title="cooktime"
            width="43.5%"
            marginRight={10}
          />
          <RecInput placeholder="minutes" title="minutes" width="43.5%" />
        </View>
      </View>
      <RecSelect placeholder="breakfast" width="43.5%" />
      <RecCheckbox title="hello there" />
      {/*<RecPhotoUpload /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    flex: 1,
    alignItems: "flex-start",
  },
  inputsContainer: {
    marginLeft: 10,
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
});

export default NewRecipeScreen;

import React from "react";
import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { Colors } from "../../colors";
import RecInput from "../RecInput";
import RecSelect from "../RecSelect";
import RecCheckbox from "../RecCheckbox";
import RecButton from "../RecButton";
// import RecPhotoUpload from '../RecPhotoUpload';

const NewRecipeScreen = (props) => {
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <View style={styles.inputsContainer}>
          <RecInput placeholder="recipe" title="recipe" />
          <View style={styles.row}>
            <RecInput
              placeholder="amount"
              title="cooktime"
              size="half"
              marginRight={10}
            />
            <RecInput placeholder="minutes" title="minutes" size="half" />
          </View>
          {/* <RecSelect placeholder="breakfast" size="half" /> */}
          <RecCheckbox label="favorite" />
          <RecCheckbox label="want to try" />
          {/*<RecPhotoUpload /> */}
          <RecInput placeholder="ingredient" title="ingredient" isMany={true} />
          <RecInput placeholder="step" title="step" isMany={true} />
        </View>

        <RecButton
          handleClick={() => console.log("save to db")}
          label="save recipe"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    flex: 1,
  },
  inputsContainer: {
    margin: 10,
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
});

export default NewRecipeScreen;

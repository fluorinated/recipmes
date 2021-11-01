import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faHeart,
  faFlag,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const RecipeScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.recipe}>
        <View style={styles.actions}>
          <View style={styles.actionContainer}>
            <FontAwesomeIcon icon={faPlus} style={styles.action} />
          </View>
          <View style={styles.actionContainer}>
            <FontAwesomeIcon icon={faHeart} style={styles.action} />
          </View>
          <View style={styles.actionContainer}>
            <FontAwesomeIcon icon={faFlag} style={styles.action} />
          </View>
          <View style={styles.actionContainer}>
            <FontAwesomeIcon icon={faTrash} style={styles.action} />
          </View>
        </View>
        <Image
          source={require("../../assets/scrambled-eggs.png")}
          style={styles.photo}
        />
        <Text style={styles.title}>scrambled eggs</Text>
        <View style={styles.description}>
          <FontAwesomeIcon icon={faCheck} style={styles.check} />
          <Text>10 mins</Text>
          <Text style={styles.separator}>•</Text>
          <Text>breakfast</Text>
        </View>
        <Text style={styles.subtitle}>ingredients</Text>
        <Text>• 2 eggs</Text>
        <Text>• Parsley</Text>
        <Text>• Butter</Text>
        <Text style={styles.subtitle}>how to make</Text>
        <View style={styles.step}>
          <Text style={styles.stepTitle}>1.</Text>
          <Text>butter pan</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepTitle}>2.</Text>
          <Text>break egg on pan</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepTitle}>3.</Text>
          <Text>let cook until egg yolk is pink and white</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.neutral7,
    flex: 1,
    alignItems: "center",
  },
  recipe: {
    width: "95%",
    marginTop: 10,
    flexDirection: "column",
    fontFamily: "Kailasa",
  },
  photo: {
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    paddingTop: 15,
    paddingBottom: 15,
  },
  description: {
    flexDirection: "row",
  },
  check: {
    marginRight: 10,
  },
  separator: {
    marginLeft: 5,
    marginRight: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  action: {
    backgroundColor: Colors.neutral5,
  },
  actionContainer: {
    backgroundColor: Colors.neutral5,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
  },
  stepTitle: {
    fontSize: 20,
    paddingRight: 5,
  },
  step: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default RecipeScreen;

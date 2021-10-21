import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Colors } from "../colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlus,
  faHeart,
  faFlag,
  faTrash,
  faCheck,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

const RecipeMiniCard = ({ props }) => {
  const [areActionsShown, setAreActionsShown] = useState(false);

  const onClickEllipsis = () => {
    if (areActionsShown) {
      setAreActionsShown(false);
    } else {
      setAreActionsShown(true);
    }
  };

  return (
    <TouchableOpacity
      style={styles.recipe}
      onPress={() => props.navigate("Recipe")}
    >
      <Image
        source={require("../assets/scrambled-eggs.png")}
        style={styles.photo}
      />
      <View>
        <Text style={styles.header}>scrambled eggs</Text>
        <View>
          <View style={styles.description}>
            <FontAwesomeIcon
              icon={faCheck}
              style={styles.check}
              color={Colors.neutral2}
            />
            <Text style={styles.subHeader}>10 mins</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.subHeaderBreakfast}>breakfast</Text>
            <View style={styles.ellipsisContainer}>
              <TouchableOpacity
                style={styles.ellipsis}
                onPressIn={onClickEllipsis}
              >
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  style={styles.action}
                  color={Colors.neutral1}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={areActionsShown ? styles.actions : styles.hidden}>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  recipe: {
    backgroundColor: Colors.neutral7,
    borderRadius: 10,
    padding: 10,
    width: "95%",
    marginTop: 10,
    flexDirection: "row",
    fontFamily: "Kailasa",
  },
  photo: {
    height: 100,
    borderRadius: 10,
  },
  header: {
    marginLeft: 20,
    fontSize: 20,
  },
  check: {
    marginRight: 10,
  },
  description: {
    marginLeft: 20,
    marginTop: 10,
    flexDirection: "row",
  },
  separator: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: Colors.neutral1,
  },
  subHeader: {
    fontSize: 15,
    color: Colors.neutral1,
  },
  subHeaderBreakfast: {
    fontSize: 15,
    color: Colors.neutral2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "83%",
  },
  action: {
    backgroundColor: Colors.neutral5,
  },
  actionContainer: {
    backgroundColor: Colors.neutral5,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    marginTop: 20,
  },
  ellipsis: {
    backgroundColor: Colors.neutral5,
    padding: 10,
    borderRadius: 7,
    width: 38,
    zIndex: 1,
  },
  ellipsisContainer: {
    marginLeft: 30,
    zIndex: 1,
  },
});

export default RecipeMiniCard;

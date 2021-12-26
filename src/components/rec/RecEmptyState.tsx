import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "constants/colors";
import RecButton from "@rec/RecButton";

const RecEmptyState = (props: any) => {
  return (
    <View>
      <View style={styles.emptyState}>
        <View style={styles.emptyStateMain}>
          <FontAwesomeIcon icon={props.icon} style={styles.icon} size={50} />
          <View style={styles.emptyStateText}>
            <Text style={styles.emptyStateHeader}>{props.header}</Text>
            <Text style={styles.emptyStateSubHeader}>{props.subheader}</Text>
          </View>
        </View>
        <View
          style={
            props.handleClick && props.buttonLabel
              ? styles.emptyStateBtn
              : styles.hidden
          }
        >
          <RecButton
            label={props.buttonLabel}
            type="secondary"
            handleClick={props.handleClick}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  icon: {
    color: Colors.neutral2,
    marginRight: 30,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 300,
    width: "100%",
  },
  emptyStateMain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },
  emptyStateHeader: {
    fontSize: 20,
    paddingBottom: 10,
  },
  emptyStateSubHeader: {
    color: Colors.neutral1,
  },
  emptyStateText: {
    width: 150,
  },
  emptyStateBtn: {
    paddingTop: 20,
    width: 150,
  },
});

export default RecEmptyState;

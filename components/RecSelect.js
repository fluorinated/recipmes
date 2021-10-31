import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const RecSelect = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    props.selectedValue(value);
  }, [value]);

  const onPress = (key) => {
    setValue(key);
    setIsOpen(false);
  };

  const onChevClick = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <View
      style={[
        styles.inputContainer,
        { width: props.size === "half" ? 180 : 370 },
        { marginRight: props.marginRight },
      ]}
    >
      <Text style={props.title ? styles.inputTitle : styles.hidden}>
        {props.title}
      </Text>
      <FontAwesomeIcon
        icon={isOpen ? faChevronUp : faChevronDown}
        style={styles.chevDown}
        color={Colors.neutral1}
        onPress={onChevClick}
      />

      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.neutral2}
        editable={false}
        onPressIn={onChevClick}
      >
        {value}
      </TextInput>
      <ScrollView style={isOpen ? styles.list : styles.hidden}>
        <FlatList
          data={[
            { key: "tsp" },
            { key: "tbsp" },
            { key: "mL" },
            { key: "g" },
            { key: "mg" },
            { key: "lb" },
            { key: "L" },
            { key: "gallon" },
          ]}
          style={[styles.flatList]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPress(item.key)}>
              <Text style={styles.listItem}>{item.key} </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  inputTitle: {
    color: Colors.neutral1,
    marginTop: 10,
    marginLeft: 5,
    fontFamily: "Kailasa",
    width: "100%",
  },
  input: {
    height: 50,
    marginTop: 10,
    backgroundColor: Colors.neutral5,
    color: Colors.neutral1,
    padding: 10,
    borderRadius: 8,
    width: "100%",
    fontFamily: "Kailasa",
  },
  inputContainer: {
    alignItems: "flex-start",
  },
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    color: Colors.neutral1,
    width: 180,
    zIndex: 1001,
  },
  flatList: {
    marginTop: "-5%",
    backgroundColor: Colors.neutral5,
    width: "100%",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    paddingBottom: 15,
    zIndex: 100,
  },
  list: {
    marginTop: "-5%",
    height: 100,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  absolute: {
    position: "absolute",
  },
  chevDown: {
    position: "absolute",
    marginTop: 55,
    marginLeft: 140,
    zIndex: 1,
  },
});

export default RecSelect;

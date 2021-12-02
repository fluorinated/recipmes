import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Unit } from "@models/Unit";

const RecSelect = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    props.selectedValue(value);
  }, [value]);

  const onPress = (key: string) => {
    setValue(key);
    setIsOpen(false);
  };

  const onChevClick = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const getSize = () => {
    if (props.size === "half") {
      return 190;
    } else if (props.size === "third") {
      return 260;
    } else {
      return 390;
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        { width: props.width || getSize() },
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
      />
      <TextInput
        style={[
          styles.input,
          props.backgroundColor
            ? { backgroundColor: props.backgroundColor }
            : {},
        ]}
        placeholder={props.placeholder}
        placeholderTextColor={
          props.placeholderTextColor
            ? props.placeholderTextColor
            : Colors.neutral2
        }
        editable={false}
        onPressIn={onChevClick}
      >
        {value}
      </TextInput>
      <SafeAreaView style={isOpen ? {} : styles.hidden}>
        <ScrollView
          style={[
            styles.list,
            props.backgroundColor
              ? { backgroundColor: props.backgroundColor }
              : {},
          ]}
        >
          {Object.values(Unit).map((unit, i) => (
            <TouchableOpacity key={i} onPress={() => onPress(unit)}>
              <Text
                style={[
                  styles.listItem,
                  { width: props.width || getSize() },
                  { marginRight: props.marginRight },
                ]}
              >
                {unit}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
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
  },
  list: {
    marginTop: "-30%",
    backgroundColor: Colors.neutral5,
    width: "100%",
    maxHeight: 100,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: "hidden",
  },
  absolute: {
    position: "absolute",
  },
  chevDown: {
    position: "absolute",
    marginTop: 55,
    marginLeft: 150,
    zIndex: 1,
  },
});

export default RecSelect;

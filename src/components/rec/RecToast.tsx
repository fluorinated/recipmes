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
import { Colors } from "@constants/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  CourierPrime_400Regular,
} from "@expo-google-fonts/courier-prime";
const RecToast = (props: any) => {
  const [isOpen, setIsOpen] = useState(props.isShowing);
  const [isError, setIsError] = useState(props.isError);

  useEffect(() => {
    setIsOpen(props.isShowing);
    if (!isError) {
      setTimeout(() => setIsOpen(false), 3000);
    }
  }, [props.isShowing]);

  let [fontsLoaded] = useFonts({
    CourierPrime_400Regular,
  });

  const onClickClose = () => {
    setIsOpen(false);
  };

  return (
    <View
      style={
        isOpen
          ? [
              styles.container,
              isError
                ? {
                    top: 440,
                    backgroundColor: Colors.red3,
                    borderColor: Colors.red2,
                  }
                : {
                    top: 590,
                    backgroundColor: Colors.green3,
                    borderColor: Colors.green2,
                  },
            ]
          : styles.hidden
      }
    >
      <TouchableOpacity style={styles.closeBtn} onPress={onClickClose}>
        <FontAwesomeIcon
          icon={faTimes}
          color={isError ? Colors.red1 : Colors.green1}
          size={25}
        />
      </TouchableOpacity>
      <View style={styles.iconMessage}>
        <FontAwesomeIcon
          icon={isError ? faExclamation : faCheck}
          color={isError ? Colors.red2 : Colors.green2}
          size={25}
        />
        <Text style={styles.message}>{props.message}</Text>
      </View>
      <SafeAreaView
        style={isError ? styles.errorMessageScrollContainer : styles.hidden}
      >
        <Text style={styles.errorTitle}>error:</Text>
        <ScrollView style={styles.errorMessageContainer}>
          <Text style={[styles.errorMessage, styles.message]}>
            {props.errorMessage}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  container: {
    zIndex: 1,
    width: 390,
    position: "absolute",
    padding: 30,
    borderRadius: 10,
    borderWidth: 1,
  },
  closeBtn: {
    display: "flex",
    alignItems: "flex-end",
    marginRight: 10,
  },
  message: {
    color: Colors.black,
    fontSize: 18,
    marginLeft: 10,
  },
  errorMessage: {
    padding: 5,
    fontSize: 18,
    fontFamily: "CourierPrime_400Regular",
  },
  iconMessage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  errorMessageScrollContainer: {
    height: 150,
  },
  errorTitle: {
    marginLeft: 10,
    marginBottom: 10,
    padding: 0,
    marginTop: -35,
  },
  errorMessageContainer: {
    borderRadius: 5,
    borderColor: Colors.red2,
    borderWidth: 1,
    backgroundColor: Colors.red2,
  },
});

export default RecToast;

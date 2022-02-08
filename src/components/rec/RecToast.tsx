import { Colors } from '@constants/colors';
import { faCheck, faExclamation, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RecToast = (props: any) => {
  const [isOpen, setIsOpen] = useState(props.isShowing ?? false);
  const [isError, setIsError] = useState(!!props.errorMessage);

  useEffect(() => {
    if (!isError) {
      setIsOpen(true);
    }
    setTimeout(() => setIsOpen(false), 3000);
  }, []);

  // let [fontsLoaded] = useFonts({
  //   CourierPrime_400Regular,
  // });

  const onClickClose = () => {
    setIsOpen(false);
  };

  return (
    <View
      style={[
        isOpen ? styles.container : styles.hidden,
        isError ? styles.containerError : styles.containerSuccess,
      ]}
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
  containerError: {
    top: 440,
    backgroundColor: Colors.red2,
    borderColor: Colors.red1,
  },
  containerSuccess: {
    top: 590,
    backgroundColor: Colors.green2,
    borderColor: Colors.green1,
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
    // fontFamily: "CourierPrime_400Regular",
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

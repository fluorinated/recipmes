import { Colors } from '@constants/colors';
import { Inter_400Regular, useFonts } from '@expo-google-fonts/inter';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const RecSearch = (props: any) => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  });

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: props.marginTop,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginBottom: props.marginBottom,
        },
      ]}
    >
      <FontAwesomeIcon
        icon={faSearch}
        style={styles.icon}
        size={props.size || 23}
        color={props.color || Colors.neutral2}
      />
      <TextInput
        style={[
          styles.input,
          fontsLoaded && { fontFamily: "Inter_400Regular" },
        ]}
        placeholderTextColor={Colors.neutral2}
        placeholder={props.label}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    borderRadius: 5,
  },
  input: {
    width: "85%",
    height: 30,
    color: Colors.neutral1,
    fontSize: 22,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 5,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default RecSearch;

import { Colors } from '@constants/colors';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import RecIconButton from '@rec/RecIconButton';
import { setSearchedText } from '@store/search/search.reducer';
import { selectSearchedText } from '@store/search/search.selectors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const RecSearch = (props: any) => {
  const searchedText: string = useAppSelector(selectSearchedText);
  const dispatch = useAppDispatch();

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
        style={styles.input}
        placeholderTextColor={Colors.neutral3}
        placeholder={props.label}
        onChangeText={(text: string) => dispatch(setSearchedText(text))}
        value={searchedText}
      ></TextInput>
      <RecIconButton
        icon={faTimes}
        style={styles.icon}
        size={16}
        color={props.color || Colors.neutral4}
        handleClick={() => dispatch(setSearchedText(""))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
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
    fontFamily: "Regular",
  },
  icon: {
    marginRight: 5,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default RecSearch;

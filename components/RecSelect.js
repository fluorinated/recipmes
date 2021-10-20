import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';

const RecSelect = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');

  const onPress = key => {
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
        {width: props.width},
        {marginRight: props.marginRight},
      ]}>
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
        editable={false}>
        {value}
      </TextInput>
      <View style={isOpen ? '' : styles.hidden}>
        <FlatList
          data={[
            {key: 'breakfast'},
            {key: 'lunch'},
            {key: 'dinner'},
            {key: 'snack'},
            {key: 'dessert'},
            {key: 'drink'},
            {key: 'cocktail'},
            {key: 'appetizer'},
          ]}
          style={[styles.flatList, styles.absolute]}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onPress(item.key)}>
              <Text style={styles.listItem}>{item.key} </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
  inputTitle: {
    color: Colors.neutral1,
    marginTop: 10,
    marginLeft: 5,
    fontFamily: 'Kailasa',
    width: '100%',
  },
  input: {
    height: 50,
    marginTop: 10,
    backgroundColor: Colors.neutral5,
    color: Colors.neutral1,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    fontFamily: 'Kailasa',
  },
  inputContainer: {
    alignItems: 'flex-start',
  },
  listItem: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    color: Colors.neutral1,
  },
  flatList: {
    marginTop: '-2%',
    backgroundColor: Colors.neutral5,
    width: '100%',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    paddingBottom: 15,
  },
  absolute: {
    position: 'absolute',
  },
  chevDown: {
    position: 'absolute',
    marginTop: 30,
    marginLeft: 140,
    zIndex: 1,
  },
});

export default RecSelect;

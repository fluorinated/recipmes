import { Colors } from '@constants/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const getTheme = (props: any) => {
  return props.dark ? styles.darkBg : styles.lightBg;
};

const RecIconButton = (props: any) => {
  return (
    <TouchableOpacity onPressIn={props.handleClick}>
      <View
        style={[
          getTheme(props),
          {
            marginRight: props.marginRight,
            marginLeft: props.marginLeft,
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
          },
          props.size < 23 ? styles.containerSmall : styles.containerLarge,
        ]}
      >
        <FontAwesomeIcon
          icon={props.icon}
          style={getTheme(props)}
          size={props.size ?? 23}
          color={props.color ?? Colors.neutral1}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerSmall: {
    padding: 5,
    borderRadius: 5,
  },
  containerLarge: {
    padding: 10,
    borderRadius: 10,
  },
  lightBg: {
    backgroundColor: Colors.neutral7,
  },
  darkBg: {
    backgroundColor: Colors.neutral6,
  },
});

export default RecIconButton;

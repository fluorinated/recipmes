import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const IngredientsScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Ingredients Screen</Text>
    </View>
  );
};

// IngredientsScreen.options = {
//   topBar: {
//     title: {
//       text: 'Ingredients',
//     },
//   },
//   bottomTab: {
//     text: 'Ingredients',
//     icon: require('../../assets/carrot.png'),
//   },
// };

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
  container: {
    flex: 1,
  },
});

export default IngredientsScreen;

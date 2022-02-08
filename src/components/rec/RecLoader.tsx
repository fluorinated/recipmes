import { Colors } from 'constants/colors';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const RecLoader = (props: any) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.pink1} />
      <Text style={styles.text}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: "100%",
  },
  text: {
    fontSize: 20,
    color: Colors.neutral1,
    paddingTop: 10,
  },
});

export default RecLoader;

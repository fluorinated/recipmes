import { Colors } from 'constants/colors';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const RecLoader = (props: any) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.pink1} />
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
});

export default RecLoader;

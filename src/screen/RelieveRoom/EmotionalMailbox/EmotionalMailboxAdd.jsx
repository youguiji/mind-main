import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const EmotionalMailboxAdd = () => {
  return (
    <ImageBackground
      source={require('../../../assets/systemImage/Cache_193d857031455d1..png')}
      resizeMode="cover"
      style={styles.container}>
      <Text>Hello, World!</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmotionalMailboxAdd;

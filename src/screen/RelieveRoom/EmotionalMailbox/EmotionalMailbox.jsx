import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const EmotionalMailbox = () => {
  return (
    <ImageBackground
    source={require('../../../assets/systemImage/F0FA48FB26FB6DE0F8358ED6BC34C5D3.jpg')}
    resizeMode="cover"
    style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text>Hello, World!</Text>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmotionalMailbox;

/*
 * @Description: 日记
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-17 21:48:01
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-19 20:12:51
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MeDiary = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MeDiary;

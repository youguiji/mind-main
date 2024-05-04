/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-05-03 14:02:01
 * @LastEditors: Austral
 * @LastEditTime: 2024-05-03 14:02:08
 */
import React from 'react';
import {View,Text, StyleSheet} from 'react-native';

const CreatorCenter = () => {
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

export default CreatorCenter;
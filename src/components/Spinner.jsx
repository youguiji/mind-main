/*
 * @Description: 转圈圈指示器
 * @Version:
 * @Autor: Austral
 * @Date: 2024-04-16 14:12:07
 * @LastEditors: Austral
 * @LastEditTime: 2024-04-16 14:12:15
 */
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Spinner = ({ size }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size || 'large'} color="rgb(255,181,209)" />
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

export default Spinner;

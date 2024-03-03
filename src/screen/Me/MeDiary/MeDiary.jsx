/*
 * @Description: 日记
 * @Version:
 * @Autor: Austral
 * @Date: 2023-10-17 21:48:01
 * @LastEditors: Austral
 * @LastEditTime: 2024-02-12 12:03:50
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';

const MeDiary = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TitleHeader
        title="日记"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default MeDiary;

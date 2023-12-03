/*
 * @Description: 隐私
 * @Version:
 * @Autor: Austral
 * @Date: 2023-09-22 16:38:33
 * @LastEditors: Austral
 * @LastEditTime: 2023-09-25 19:55:09
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TitleHeader from '../../../../components/TitleHeader';

const MeSettingPrivacy = ({ navigation }) => {
  return (
    <View>
      <TitleHeader
        title="隐私"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
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

export default MeSettingPrivacy;

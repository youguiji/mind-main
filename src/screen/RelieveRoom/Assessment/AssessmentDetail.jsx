/*
 * @Description:
 * @Version:
 * @Autor: Austral
 * @Date: 2024-02-24 20:34:04
 * @LastEditors: Austral
 * @LastEditTime: 2024-02-24 21:17:16
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';

const AssessmentDetail = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TitleHeader
        title="心理测试"
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <Pressable onPress={()=>{navigation.navigate('AssessmentTest')}}>
        <Text style={{marginTop: 40}}>立即测试</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    
  },
});

export default AssessmentDetail;

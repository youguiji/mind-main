/*
 * @Description: 
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-07-21 19:21:27
 * @LastEditors: Austral
 * @LastEditTime: 2023-09-20 16:19:46
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import TitleHeader from '../../../components/TitleHeader;'
import TitleHeader from '../../../components/TitleHeader';

const ArticleDetail = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TitleHeader
        title="文章详情"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
});

export default ArticleDetail;
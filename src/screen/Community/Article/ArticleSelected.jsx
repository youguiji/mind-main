/*
 * @Description: 精选文章
 * @Version:
 * @Autor: Austral
 * @Date: 2024-05-03 14:07:21
 * @LastEditors: Austral
 * @LastEditTime: 2024-05-03 14:21:12
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TitleHeader from '../../../components/TitleHeader';
import ConsultantCard from '../../RelieveRoom/Components/ConsultantCard';
import Icon from '../../../components/Icon';
import ArticleClassification from './Components/ArticleClassification';
const ArticleSelected = ({ navigation }) => {
  const [consultant, setConsultant] = useState([
    {
      avatar: 'https://cdn.psy.com.cn/2023/07/19/16440426.png',
      username: '郭蓄芳',
      content: '国家二级心理咨询师,心理治疗室主任',
      title: '家庭关系',
    },
  ]);

  return (
    <View style={{ backgroundColor: '#fff' }}>
      <TitleHeader
        title="精选"
        navigator={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        style={{ marginTop: 40, backgroundColor: 'rgb(252,254,251)' }}
        showsVerticalScrollIndicator={false}>
        {consultant.map(item => {
          return (
            <ArticleClassification
              avatar={item.avatar}
              content={item.content}
              title={item.title}
              username={item.username}
              // viewCount={item.viewCount}
              // sun={item.likeCount}
              // url={imageUrl}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    // backgroundColor: '#fff',
  },
});

export default ArticleSelected;

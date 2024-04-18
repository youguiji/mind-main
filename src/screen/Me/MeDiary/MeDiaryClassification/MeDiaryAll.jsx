/*
 * @Description: 全部日记
 * @Version:
 * @Autor: Austral
 * @Date: 2024-03-04 07:07:14
 * @LastEditors: Austral
 * @LastEditTime: 2024-03-30 19:58:15
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getUserDirary } from '../../../../network/modules/user';
import MeDiaryCard from '../Components/MeDiaryCard';

const MeDiaryAll = ({ navigation }) => {
  const [diary, setDiary] = useState([
    { id: 0, title: '今天是一个好天气', content: '今天去跑步了，很有成就感' },
    {
      id: 1,
      title: '今天和朋友出去玩啦',
      content: '天气晴朗，万物复苏，这样子的天气很难让人想起来...',
    },
  ]);
  // useEffect(() => {
  //   getUserDirary(0, 1, 10).then(res => {
  //     setDiary(res.data);
  //   });
  // }, [diary]);
  return (
    <ScrollView style={styles.container}         showsVerticalScrollIndicator={false}
    >
      {diary.map(item => {
        return (
          <MeDiaryCard
            key={item.id}
            title={item.title}
            content={item.content}
            // onPress={navigation.navigate('MeDiaryDetail')}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MeDiaryAll;
